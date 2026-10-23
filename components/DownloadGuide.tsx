'use client';

import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import InterfaceIcon, { AnimatedIcon } from './InterfaceIcon';
import { FaAndroid, FaApple, FaAppStoreIos, FaLinux, FaWindows } from 'react-icons/fa6';
import { currentDownloads, commandInstallMethods, getDownloadInstallMethod, webInstallMethod, type DownloadDeviceId, type InstallMethod } from '@/lib/brewguideDownloads';
import { commandUpdateMethods, getDownloadUpdateMethod, updateDescriptions, webUpdateMethod } from '@/lib/brewguideUpdates';
import DocCodeBlock from './DocCodeBlock';
import { copyText } from '@/lib/clipboard';
import styles from './DownloadGuide.module.css';
import documentStyles from './document.module.css';
import '@/transitions/download-guide.css';

const devices = [
  { id: 'ios', label: 'iPhone 或 iPad', title: 'iOS', description: '优先使用 Web App，或使用 IPA 自行签名安装。', Icon: FaAppStoreIos },
  { id: 'android', label: 'Android', title: 'Android', description: '使用 APK 安装包，下载后打开安装。', Icon: FaAndroid },
  { id: 'macos', label: 'macOS', title: 'macOS', description: '优先使用 Homebrew，或使用对应芯片的 DMG 安装包。', Icon: FaApple },
  { id: 'windows', label: 'Windows', title: 'Windows', description: '优先使用 WinGet，或使用 EXE 安装包。', Icon: FaWindows },
  { id: 'linux', label: 'Linux', title: 'Linux', description: '使用 AppImage，授予执行权限后运行。', Icon: FaLinux },
] as const;

type Page = 0 | 1 | 2;
const pages: Page[] = [0, 1, 2];

export default function DownloadGuide({ mode = 'install' }: { mode?: 'install' | 'update' }) {
  const isUpdate = mode === 'update';
  const [page, setPage] = useState<Page>(0);
  const [selected, setSelected] = useState<DownloadDeviceId | null>(null);
  const [method, setMethod] = useState<InstallMethod | null>(null);
  const [height, setHeight] = useState<number>();
  const headingId = useId();
  const pageRefs = useRef<Partial<Record<Page, HTMLDivElement | null>>>({});
  const deviceTrigger = useRef<HTMLButtonElement | null>(null);
  const methodTrigger = useRef<HTMLButtonElement | null>(null);
  const returnFocus = useRef<HTMLButtonElement | null>(null);
  const device = devices.find((item) => item.id === selected);
  const downloads = selected ? currentDownloads[selected] : [];
  const commandMethod = selected ? (isUpdate ? commandUpdateMethods : commandInstallMethods)[selected] : undefined;
  const skipsMethodSelection = selected === 'linux' || (isUpdate && selected === 'android');
  const backLabel = page === 2 && !skipsMethodSelection ? (isUpdate ? '返回更新方式' : '返回安装方式') : '重新选择设备';

  useLayoutEffect(() => {
    const content = pageRefs.current[page];
    if (!content) return;
    const measure = () => setHeight(Math.ceil(content.getBoundingClientRect().height));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(content);
    return () => observer.disconnect();
  }, [page, selected, method]);

  useEffect(() => {
    const target = returnFocus.current ?? (page > 0 ? pageRefs.current[page]?.querySelector('h2') : null);
    target?.focus({ preventScroll: true });
    returnFocus.current = null;
  }, [page]);

  function goBack() {
    const returnsToMethods = page === 2 && !skipsMethodSelection;
    returnFocus.current = returnsToMethods ? methodTrigger.current : deviceTrigger.current;
    setPage(returnsToMethods ? 1 : 0);
  }

  function methodButton(item: InstallMethod, label: string) {
    return (
      <button key={item.id} type="button" className={styles.device} onClick={(event) => { methodTrigger.current = event.currentTarget; setMethod(item); setPage(2); }}>
        <span>{label}</span>
        <InterfaceIcon name="right" width={16} aria-hidden="true" />
      </button>
    );
  }

  return (
    <section
      className={`${documentStyles.mediaFrame} ${styles.guide} t-download-guide`}
      aria-labelledby={`${headingId}-${page}`}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && page > 0 && !event.defaultPrevented && !event.nativeEvent.isComposing) {
          event.preventDefault();
          event.stopPropagation();
          goBack();
        }
      }}
    >
      <button
        type="button"
        className={styles.back}
        data-visible={page > 0}
        inert={page === 0}
        aria-hidden={page === 0 || undefined}
        tabIndex={page === 0 ? -1 : 0}
        onClick={goBack}
        aria-label={backLabel}
        title={backLabel}
      >
        <InterfaceIcon name="left" width={18} aria-hidden="true" />
      </button>
      <div className={`${styles.viewport} t-page-slide t-resize`} data-page={page + 1} style={{ height }}>
        {pages.map((screen) => (
          <div
            key={screen}
            ref={(element) => { pageRefs.current[screen] = element; }}
            className={`${styles.screen} t-page`}
            data-page-id={screen + 1}
            data-position={screen < page ? 'before' : 'after'}
            inert={screen !== page}
            aria-hidden={screen !== page || undefined}
          >
            <header className={styles.header}>
              <h2 id={`${headingId}-${screen}`} tabIndex={-1} className={styles.heading}>
                {screen === 0 ? '选择你的设备' : device && <><device.Icon size={18} aria-hidden="true" />{screen === 2 ? method?.title : device.title}</>}
              </h2>
            </header>
            {screen === 0 ? (
              <div className={styles.devices}>
                {devices.map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    type="button"
                    className={styles.device}
                    onClick={(event) => {
                      deviceTrigger.current = event.currentTarget;
                      setSelected(id);
                      if (id === 'linux' || (isUpdate && id === 'android')) {
                        setMethod((isUpdate ? getDownloadUpdateMethod : getDownloadInstallMethod)(id, currentDownloads[id][0]));
                        setPage(2);
                      } else {
                        setMethod(null);
                        setPage(1);
                      }
                    }}
                  >
                    <Icon size={18} aria-hidden="true" />
                    <span>{label}</span>
                    <InterfaceIcon name="right" className={styles.chevron} width={16} aria-hidden="true" />
                  </button>
                ))}
              </div>
            ) : screen === 1 ? device && (
              <>
                <p className={styles.description}>{isUpdate ? updateDescriptions[device.id] : device.description}</p>
                <div className={styles.content}>
                  <div className={styles.options}>
                    {commandMethod && methodButton(commandMethod, commandMethod.title)}
                    {selected === 'ios' && methodButton(isUpdate ? webUpdateMethod : webInstallMethod, 'Web App')}
                    {downloads.map((download) => {
                      const installMethod = (isUpdate ? getDownloadUpdateMethod : getDownloadInstallMethod)(device.id, download);
                      return installMethod ? methodButton(installMethod, download.label) : (
                        <a key={download.url} href={download.url} className={styles.device}>
                          <span>{download.label}</span>
                          <InterfaceIcon name="download" width={16} aria-hidden="true" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : method && (
              <div className={styles.methodView} key={method.id}>
                {method.steps.length === 1 ? (
                  <div className={styles.singleStep}>
                    <p>{method.steps[0].text}</p>
                    {method.steps[0].command && <DocCodeBlock wrap copyable={false}><code>{method.steps[0].command}</code></DocCodeBlock>}
                  </div>
                ) : <ol className={styles.steps} aria-label="操作步骤">
                  {method.steps.map((step) => (
                    <li key={step.text}>
                      <p>{step.text}</p>
                      {step.command && <DocCodeBlock wrap copyable={false}><code>{step.command}</code></DocCodeBlock>}
                    </li>
                  ))}
                </ol>}
                {method.actions.length > 0 && <div className={styles.operations}>
                  {method.actions.map((action) => action.kind === 'copy' ? (
                    <CopyCommandButton key={action.value} label={action.label} command={action.value} />
                  ) : (
                    <a key={action.value} href={action.value} className={styles.device} target={action.value === 'https://coffee.chu3.top/' ? '_blank' : undefined} rel="noreferrer">
                      <span>{action.label}</span>
                      {action.value === 'https://coffee.chu3.top/' ? <InterfaceIcon name="external" width={16} aria-hidden="true" /> : <InterfaceIcon name="download" width={16} aria-hidden="true" />}
                    </a>
                  ))}
                </div>}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function CopyCommandButton({ label, command }: { label: string; command: string }) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const resetRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const attemptRef = useRef(0);

  useEffect(() => () => {
    attemptRef.current += 1;
    if (resetRef.current) clearTimeout(resetRef.current);
  }, []);

  async function copy() {
    const attempt = ++attemptRef.current;
    if (resetRef.current) clearTimeout(resetRef.current);
    let nextStatus: 'copied' | 'error';
    try {
      await copyText(command);
      nextStatus = 'copied';
    } catch {
      nextStatus = 'error';
    }
    if (attempt !== attemptRef.current) return;
    setStatus(nextStatus);
    resetRef.current = setTimeout(() => setStatus('idle'), 2000);
  }

  const message = status === 'copied' ? '已复制' : status === 'error' ? '复制失败，请手动复制上方命令' : '';

  return (
    <button type="button" className={styles.device} onClick={copy} title={message || label}>
      <span>{label}</span>
      <span className={styles.action}>
        <AnimatedIcon name={status === 'copied' ? 'check' : status === 'error' ? 'error' : 'copy'} width={16} />
      </span>
      <span className="sr-only" role="status">{message}</span>
    </button>
  );
}

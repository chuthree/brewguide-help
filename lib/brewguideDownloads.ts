export type DownloadDeviceId = 'ios' | 'android' | 'macos' | 'windows' | 'linux';
type Download = { label: string; url: string };

// Keep the current version and filenames aligned with chu3-web-next's brewGuideDownloads.ts.
const version = '1.6.2';
const asset = (suffix: string) => `https://github.com/chuthree/brew-guide/releases/download/v${version}/BrewGuide_${version}_${suffix}`;

export const currentDownloads: Record<DownloadDeviceId, Download[]> = {
  ios: [{ label: 'iOS IPA', url: asset('ios.ipa') }],
  android: [{ label: 'Android APK', url: asset('android.apk') }],
  macos: [
    { label: 'Mac (Apple Silicon) DMG', url: asset('macos_arm64.dmg') },
    { label: 'Mac (Intel) DMG', url: asset('macos_x64.dmg') },
  ],
  windows: [{ label: 'Windows (x64) EXE', url: asset('windows_x64.exe') }],
  linux: [{ label: 'Linux AppImage (x64)', url: asset('linux_x64.AppImage') }],
};

type InstallAction = { kind: 'copy' | 'link'; label: string; value: string };
export type InstallMethod = {
  id: string;
  title: string;
  steps: { text: string; command?: string }[];
  actions: InstallAction[];
};

const macSigningCommand = 'xattr -cr "/Applications/Brew Guide.app"\ncodesign --force --deep --sign - "/Applications/Brew Guide.app"';
const macSigningStep = {
  text: '应用未经 Apple 开发者签名，首次打开前，在终端执行以下命令，解除下载隔离并本地自签：',
  command: macSigningCommand,
};
const macSigningAction: InstallAction = { kind: 'copy', label: '复制签名命令', value: macSigningCommand };
const homebrewCommand = 'brew install --cask chuthree/brew-guide/brew-guide';
const wingetCommand = 'winget install chuthree.brewguide';

export const commandInstallMethods: Partial<Record<DownloadDeviceId, InstallMethod>> = {
  macos: {
    id: 'homebrew',
    title: '使用 Homebrew 安装',
    steps: [
      { text: '如果已安装 Homebrew，在终端执行：', command: homebrewCommand },
      { text: '完成后，从「应用程序」打开 Brew Guide。' },
    ],
    actions: [
      { kind: 'copy', label: '复制安装命令', value: homebrewCommand },
    ],
  },
  windows: {
    id: 'winget',
    title: '使用 WinGet 安装',
    steps: [
      { text: '打开终端，执行以下命令：', command: wingetCommand },
      { text: '等待安装完成后，打开 Brew Guide。' },
    ],
    actions: [{ kind: 'copy', label: '复制安装命令', value: wingetCommand }],
  },
};

export const webInstallMethod: InstallMethod = {
  id: 'web',
  title: '使用 Web App',
  steps: [
    { text: '使用 Safari 打开 Brew Guide 网页版。' },
    { text: '点击「分享」-「添加到主屏幕」，之后就能从桌面打开。' },
  ],
  actions: [{ kind: 'link', label: '打开 Web App', value: 'https://coffee.chu3.top/' }],
};

export function getDownloadInstallMethod(device: DownloadDeviceId, download: { label: string; url: string }): InstallMethod | null {
  const action: InstallAction = { kind: 'link', label: `下载 ${download.label}`, value: download.url };
  if (device === 'macos') {
    return {
      id: download.url,
      title: download.label,
      steps: [
        { text: '下载并打开 DMG，将 Brew Guide 拖入「应用程序」。' },
        macSigningStep,
        { text: '完成后，从「应用程序」打开 Brew Guide。' },
      ],
      actions: [action, macSigningAction],
    };
  }
  if (device === 'ios') {
    return {
      id: download.url,
      title: '使用 iOS IPA 安装',
      steps: [
        { text: '下载 IPA（arm64）安装包。' },
        { text: '使用 SideStore、AltStore 等工具自行签名安装。' },
      ],
      actions: [action],
    };
  }
  if (device === 'linux') {
    const command = 'chmod +x BrewGuide_*_linux_x64.AppImage\n./BrewGuide_*_linux_x64.AppImage';
    return {
      id: download.url,
      title: '使用 Linux AppImage',
      steps: [
        { text: '下载 AppImage（x64）安装包。' },
        { text: '在文件所在目录打开终端，授予执行权限并运行：', command },
      ],
      actions: [action, { kind: 'copy', label: '复制运行命令', value: command }],
    };
  }
  return null;
}

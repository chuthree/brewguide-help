import { getDownloadInstallMethod, type DownloadDeviceId, type InstallMethod } from './brewguideDownloads';

export const updateDescriptions: Record<DownloadDeviceId, string> = {
  ios: 'Web App 通常会自动更新；如果使用 IPA 安装，请下载新版并使用原来的签名方式安装。',
  android: '下载新版 APK，覆盖安装。',
  macos: '通过 Homebrew 更新，或下载对应芯片的新版 DMG 安装包。',
  windows: '通过 WinGet 更新，或下载新版 EXE 安装包。',
  linux: '下载新版 AppImage，授予执行权限后运行。',
};

const homebrewCommand = 'brew update\nbrew upgrade --cask chuthree/brew-guide/brew-guide';
const wingetCommand = 'winget upgrade chuthree.brewguide';

export const commandUpdateMethods: Partial<Record<DownloadDeviceId, InstallMethod>> = {
  macos: {
    id: 'homebrew-update',
    title: '使用 Homebrew 更新',
    steps: [
      { text: '如果之前使用 Homebrew 安装，先退出 Brew Guide，再在终端执行：', command: homebrewCommand },
      { text: '更新完成后，从「应用程序」打开 Brew Guide。' },
    ],
    actions: [{ kind: 'copy', label: '复制更新命令', value: homebrewCommand }],
  },
  windows: {
    id: 'winget-update',
    title: '使用 WinGet 更新',
    steps: [
      { text: '如果之前使用 WinGet 安装，先退出 Brew Guide，再打开终端执行：', command: wingetCommand },
      { text: '更新完成后，打开 Brew Guide。' },
    ],
    actions: [{ kind: 'copy', label: '复制更新命令', value: wingetCommand }],
  },
};

export const webUpdateMethod: InstallMethod = {
  id: 'web-update',
  title: '更新 Web App',
  steps: [
    { text: 'Web App 通常无需手动更新，关闭后重新打开主屏幕上的 Brew Guide 即可。' },
    { text: '如果应用内出现更新弹窗，点击「更新」即可。' },
  ],
  actions: [],
};

export function getDownloadUpdateMethod(device: DownloadDeviceId, download: { label: string; url: string }): InstallMethod {
  const installMethod = getDownloadInstallMethod(device, download);
  const actions: InstallMethod['actions'] = [{ kind: 'link', label: `下载 ${download.label}`, value: download.url }];

  if (device === 'macos' && installMethod) {
    return {
      ...installMethod,
      steps: [
        { text: '退出 Brew Guide，下载并打开对应芯片的新版 DMG 安装包。' },
        { text: '将 Brew Guide 拖入「应用程序」，选择替换已有应用。' },
        ...installMethod.steps.slice(1),
      ],
    };
  }
  if (device === 'linux' && installMethod) {
    return {
      ...installMethod,
      steps: [
        { text: '退出 Brew Guide，下载新版 AppImage（x64）安装包。' },
        ...installMethod.steps.slice(1),
        { text: '之后使用新版 AppImage 打开 Brew Guide；如果创建过快捷方式，请将其指向新文件。' },
      ],
    };
  }
  if (device === 'ios') {
    return {
      id: download.url,
      title: '使用 iOS IPA 更新',
      steps: [
        { text: '下载新版 IPA（arm64）安装包。' },
        { text: '使用原来的 SideStore、AltStore 等签名工具和同一 Apple 账号，覆盖安装到已有应用。' },
      ],
      actions,
    };
  }
  return {
    id: download.url,
    title: device === 'android' ? '使用 Android APK 更新' : '使用 Windows EXE 更新',
    steps: [
      { text: device === 'android' ? '下载新版 APK 安装包。' : '退出 Brew Guide，下载新版 EXE 安装包。' },
      { text: device === 'android' ? '打开 APK，按提示更新已有应用，无需先卸载。' : '打开 EXE，按安装程序提示完成更新，无需先卸载。' },
      { text: '更新完成后，打开 Brew Guide。' },
    ],
    actions,
  };
}

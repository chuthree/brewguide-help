---
title: 安装
module: 入门
---

在手机、平板或电脑上安装 Brew Guide，请根据你的设备查看下方的下载方式和安装步骤。

---

如果你使用 iPhone 或 iPad，建议用 Safari 打开[网页版](https://coffee.chu3.top/)，点击 `分享` - `添加到主屏幕`，之后就能从桌面打开。

如需原生应用，可以[下载 IPA（arm64）](https://github.com/chuthree/brew-guide/releases/latest)，通过 SideStore、AltStore 等工具自行签名安装。

---

如果你使用安卓设备，[下载 APK（universal）](https://github.com/chuthree/brew-guide/releases/latest) 后打开安装即可。

---

如果你使用 macOS，且已安装 Homebrew，在终端执行：

```bash
brew install --cask chuthree/brew-guide/brew-guide
```

也可以按芯片类型下载并打开 DMG，将 Brew Guide 拖入 `应用程序`：

- Apple 芯片（M 系列）：[下载 DMG（arm64）](https://github.com/chuthree/brew-guide/releases/latest)
- Intel 芯片：[下载 DMG（x64）](https://github.com/chuthree/brew-guide/releases/latest)

应用未经 Apple 开发者签名，首次打开前，在终端执行以下命令，解除下载隔离并本地自签：

```bash
xattr -cr "/Applications/Brew Guide.app"
codesign --force --deep --sign - "/Applications/Brew Guide.app"
```

完成后，从 `应用程序` 打开 Brew Guide。

---

如果你使用 Windows，在终端通过 WinGet 安装：

```powershell
winget install chuthree.brewguide
```

也可以[下载 EXE（x64）](https://github.com/chuthree/brew-guide/releases/latest)，双击后按提示安装。

---

如果你使用 Linux，[下载 AppImage（x64）](https://github.com/chuthree/brew-guide/releases/latest) 后，在文件所在目录打开终端，授予执行权限并运行：

```bash
chmod +x BrewGuide_*_linux_x64.AppImage
./BrewGuide_*_linux_x64.AppImage
```

---
title: New Balance
parent: Installation guides
nav_order: 3
---

# New Balance Installation
This guide describes how to install and run the **New Balance Mod** for Gothic II on **Linux (Ubuntu 24.04.x**)
using the **Steam** version of the game.

## Prerequisites

- Steam
- Gothic II (Steam version)
- Ubuntu 24.04.3 (or compatible)
- protontricks (Flatpak version from Flathub)
- New Balance Mod
- New Balance Scripts
- Wine
- Winetricks


## 1. Install Gothic II (Steam version)

1. Right-click on the game in your library and select **Properties**.

2. Open the **Betas** tab.
3. Select **None** version.
4. Then go to **Compatibility** tab.
5. Check **Force the use of a specific Steam Play compatibility tool**.
6. Change the Proton version to **Proton 8.0-5**.
7. Install game.

> **Recommended:** Disable the Steam Overlay

## 2. Create and configure wine prefix
I will use and configure the default Wine prefix, which is located in the home directory.  
For proper operation, it is recommended to **remove the `.wine` directory** so everything is installed cleanly.

If you already use the default Wine prefix for other games, consider creating a separate Wine prefix instead.

1. Open a terminal and run:
    ``` bash
    winecfg

This command will create a new, clean Wine prefix if it does not already exist.

2. Set the Windows version to **Windows 10**, then click **apply** and **OK**.


## 3. Install New Balance
With a clean Wine prefix ready, we can install the mod.
New Balance is distributed with its own `.exe` installer, so Wine is required.

1. Navigate to the directory containing `NewBalanceMod.exe` and `.bin` files.

2. Open a terminal and run:
    ```bash
    wine NewBalanceMod.exe
3. Select folder with Gothic II.
4. In the installer options, enable **Visual C++ Redistributable** and **base settings** (In my case, I didn't install DX11).


## 4. Install Union
At this point, the mod itself should be installed correctly.
However, on Linux the installer does not install Union automatically, which is required for the mod to work.

Fortunately, the installer provides the Union executable, so we can install it manually.
Before doing so, Wine needs an additional component: **.NET Framework 4.8**.

1. Open a terminal and run:
    ```bash
    winetricks -q dotnet48

2. Go to the main folder with Gothic II.

3. Open the `_backupFiles` directory.
4. Open a terminal and run:
    ```bash
    wine Union_1_0m.exe

If you encounter an error after selecting the language and clicking Continue, simply close the error window and run the command again.
Eventually, the installer should display the window for selecting the game directory.

5. Select the Gothic II directory.

    #### Important:
    Make sure the installation path is correct. It should **not** start with `C:\` (as on Windows).  
    Instead, for example it should start with a `Z:\`.


You can verify that Union was installed correctly by checking whether `Union - uninstall.exe` appears in the Gothic II directory.

6. If prompted to choose the game version, select **Gothic II NOTR**.


## 5. Install directmusic
1. Open a terminal and run:
    ```bash
    flatpak run com.github.Matoking.protontricks 39510 directmusic


## 6. Remove SystemPack.ini

1. Open the game folder and navigate to the `system` directory.

2. Delete `SystemPack.ini`

## 7. Modify user.reg

1. Go to the **compatdata** folder inside your `steamapps` directory:
`~/.steam/steam/steamapps/compatdata/39510/pfx`
2. Open `user.reg` with a text editor.
3. Locate the subsection `[Software\\Wine\\DllOverrides]`
4. Find and remove the following line:
    `"dsound"="native,builtin"`

## 8. Copy New Balance Scripts

Now you can copy the New Balance Scripts (English, Polish, or any other language you prefer) and paste to the game folder.
    
#### Important:
Do not copy the entire directory at once. Due to case sensitivity differences on Linux, some files may not be overwritten correctly. Instead, copy individual files into their appropriate target directories.


## 9. Launch the game via Steam
Launch game through Steam. The game should now start and work correctly.

For better performance, you can enable full screen mode in the in-game settings.

<sub>Last updated: 28.12.2025 by: Yorick0499</sub>


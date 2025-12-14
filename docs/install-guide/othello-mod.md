---
title: Othello Mod 4.3.5
parent: Installation guides
nav_order: 2
---

# Othello Mod Installation

This guide describes how to install and run the **Othello Mod 4.3.5** for **Gothic I** on **Linux (Ubuntu 24.04.x**)
using the **Steam** version of the game.

## Prerequisites

- Steam
- Gothic I (Steam version)
- Ubuntu 24.04.3 (or compatible)
- Flatpak with the Flathub repository
- Othello Mod

## 1. Install Gothic I (Steam version)

1. Install your game.
2. Right-click on the game in your library and select **Properties**.
3. Open the **Betas** tab.
4. Select **original - Original Release** version.

## 2. Fix the base game
Follow the [Gothic I/II installation guide](https://yorick0499.github.io/gothic-linux-guide/install-guide/gothic-i-ii.html) from step 2 to step 6.
This ensures the game runs correctly before installing the mod.

## 3. Extract the Othello Mod into the game directory
1. Extract **Othello 4.3.zip** into the main directory:

`~/.steam/steam/steamapps/common/Gothic`

2. Extract **Othello_Scripts (4.3.5 Build - build date may vary).zip** into the same directory:

`~/.steam/steam/steamapps/common/Gothic`

3. Go to:

`~/.steam/steam/steamapps/common/Gothic/Data`

and delete this file:

`zGamepad.vdf`

### Important notes about file replacement!
Make sure that **all files were properly replaced** and that **no duplicate files were created**.
- Files provided by the Othello Mod usually have the format:

`Xxxx.yyy`

(capital first letter)
- Original game files often use:

`XXXX.YYY`

(all uppercase)

Pay special attention to the following files:
- `GOTHIC.EXE`
- `SHW32.DLL`

Also make sure that the **SYSTEM** directory does not exist in two variants
(e.g. `SYSTEM` and `System`).
You want to **replace files**, not create duplicates.

## 4. Add a launch script (mouse fix)
At this point, the game should start, but you will most likely experience mouse issues
(e.g. jittering or inability to rotate the camera fully).

To fix this:
1. In the Steam Library, right-click **Gothic I**.
2. Select **Properties**.
3. In the **General** tab, add the following to **Launch Options**:
```
WINEDLLOVERRIDES="dinput.dll=n,b" %command%
```

## 5. Launch the game
After completing all steps above, the game should launch and run correctly
with the Othello Mod enabled.


<sub>Last updated: 14.12.2025 by: Yorick0499</sub>
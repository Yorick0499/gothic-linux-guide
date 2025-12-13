# Gothic Linux Guide

# Gothic I/II Installation

## Prerequisites

- Steam
- Ubuntu 24.04.3
- Flatpak with the Flathub repository

## Install Gothic I/II Steam version

1.  Install your game.
2.  Right-click on the game in your library and go to **Properties**.
3.  Go to **Betas** tab.
4.  Select **workshop - Workshop Beta** version.

## Change Proton version

1.  Right-click on the game in your library and go to **Properties**
2.  Go to **Compatibility** tab
3.  Check **Force the use of a specific Steam Play compatibility tool**
4.  Change the Proton version to **Proton 8.0-5**

## Install protontricks

Install **protontricks**, which allows you to easily install various
Windows components:

    flatpak install flathub com.github.Matoking.protontricks

## Install directmusic for Gothic I/II

For Gothic I:

    flatpak run com.github.Matoking.protontricks 65540 directmusic

For Gothic II:

    flatpak run com.github.Matoking.protontricks 39510 directmusic

## Remove SystemPack.ini

1.  Open the game folder and navigate to the system directory, e.g.,

    `~/.steam/steam/steamapps/common/Gothic/system`

2.  Delete `SystemPack.ini`

## Modify user.reg

1.  Go to the **compatdata** folder inside your `steamapps` directory:
    - Gothic I: `~/.steam/steam/steamapps/compatdata/65540/pfx`
    - Gothic II: `~/.steam/steam/steamapps/compatdata/39510/pfx`
2.  Open `user.reg` with a text editor.
3.  Locate the subsection `[Software\\Wine\\DllOverrides]`
4.  At the bottom of this subsection, add the following line:
    `"ddraw"="native,builtin"`
5.  In the same subsection find and remove the following line:
    `"dsound"="native,builtin"`

## Launch the game

After completing all the steps above, the game should run correctly. By
installing the **workshop - Workshop Beta** version, you also can
install various mods and plugins from Steam Workshop, which should work
properly as well.

## Credits / References

This guide was inspired by a tutorial posted on Reddit:
[link](https://www.reddit.com/r/worldofgothic/comments/1omr7h3/gothic_gothic_2_notr_spine_installation_guide_for/)

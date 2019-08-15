# Coming soon to an RSS near you
Don't ask about this project

## Tutorials
### Before Editing
1. Create a _Microsoft GitHub_ account
    - There should be a `Sign up` button in the top right corner of your screen.
    - [_For those lazy people, here's a link_](https://github.com/join)
2. Install _Microsoft Visual Studio Code_
    - https://code.visualstudio.com/
3. Install `git-scm` for your operating system
    - _Ubuntu_ - `sudo apt install git`
    - _Microsoft Windows_
        1. [Download Git](https://git-scm.com/downloads)
        2. Run the executable
        3. Read the terms of the GNU GPLv2 and agree to the licence
        4. Click next on the installation destination location screen
        5. Click next on the components screen
        6. Click next on the "Start Menu Folder" screen
        7. Click next on the "Adjusting your PATH environment" screen
        8. Select "Checkout as-is, commit Unix-style line endings" on the "line ending" screen
            - Technically you can choose whatever you like, but I will hate you if you upload any files saved with the Windows `\r\n` instead of the Unix `\n`.
        9. Complete the installation.
            - I recommend not reading the `ReleaseNotes.rtf` file.
4. Open _Microsoft Visual Studio Code_, clone and open the project
    1. Click the `View` menu at the top, and select the `Command Pallete` option.  
    It should be the first option in the list
    2. Type in `clone` and select `Git: clone`
    3. Enter `https://github.com/7coil/beacon` as the Repository URL
    4. Select a suitable location to download the files
    5. Look at the bottom right hand corner of _Microsoft Visual Studio Code_  
    There should be a little loading animation.  
    After the "cloning" finishes, press the `Open` button in the bottom right hand corner.
5. Close _Microsoft Visual Studio Code_ (for now)

### Adding a podcast
1. In the `/src/posts/podcast` folder, create a new folder with the episode number
2. Create an `index.md` file in the folder, and add the following content:
    ```
    ---
    title: The name of the episode goes here
    description: A description of what happened in the episode goes here
    date: '2019-07-17'
    ---

    Whatever you want the webpage to show here.
    Maybe add some cool images if you really want to.

    Get some help with Markdown here:
    https://guides.github.com/features/mastering-markdown/
    ```
3. Copy an MP3 file into the folder, and rename it as `podcast.mp3`
4. Open _Microsoft Visual Studio Code_
5. In the bar at the bottom, click the "sync" button in the bottom left.
    - This synchronises your folder with the one stored on GitHub.
6. Open the _Source Control_ tab
    1. Look at the left hand side of _Microsoft Visual Studio Code_
        - There should be five icons.
        - Click the icon with:
            - Three circles with some lines connecting together
            - The icon that is above the bug
            - The icon that is below the magnifying glass
7. In the message box, enter a message to explain why you are adding the files listed below.
    - I recommend something like `Adding episode 39 of the podcast`
8. Press the tick above the message box
9. In the bar at the bottom, click the "sync" button in the bottom left.
10. Click Ok.

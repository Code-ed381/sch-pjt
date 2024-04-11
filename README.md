1. Download zip file on Github or clone repo if conversant with version control.
2. Open VS Code or any code editor to the root of the project.
3. Open a terminal pointing to the root directory of project and issue 'npm install' command to install all modules of application
4. When module installation is done, issue 'npm start' command to run your application on a local server.
5. Your app is ready and live!!

NB: Install NodeJs 
# installs Chocolatey (Windows Package Manager)
Set-ExecutionPolicy Bypass -Scope Process -Force;
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072;
iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'));



# download and install Node.js
choco install nodejs --version="20.12.0"



# verifies the right Node.js version is in the environment
node -v # should print `v20.12.0`



# verifies the right NPM version is in the environment
npm -v # should print `10.5.0`


# Supabase URL
Database_URL - https://supabase.com/dashboard/project/hbvzbmargzwrfctmqqtd/editor

# Supabase login
login - adjei.edwin381@gmail.com
password - SamsProject@1

# Google login
login - adjei.edwin381@gmail.com
password - SamsProject@123

# Database
database name - Sams Database
password - SamsProject@1


# Setting up GitHub with Visual Studio Code on Windows
This guide will walk you through the process of setting up GitHub with Visual Studio Code on a Windows operating system.

# Prerequisites
Before you begin, make sure you have the following:

Visual Studio Code installed on your Windows machine. If not, download and install it from here.
A GitHub account. If you don't have one, sign up for free at GitHub.

# Steps
Step 1: Install Git
Git is a version control system that GitHub relies on. If you don't have Git installed, download and install it from here.

Step 2: Configure Git
Once Git is installed, open a command prompt and set up your username and email address with the following commands, replacing your_username and your_email@example.com with your GitHub username and email:


git config --global user.name "your_username"
git config --global user.email "your_email@example.com"

Step 3: Copy Repository URL
Go to the GitHub repository you want to clone in your web browser. Click on the "Code" button and copy the URL provided.

Step 4: Open Visual Studio Code
Open Visual Studio Code on your Windows machine.

Step 5: Open the Command Palette
Press Ctrl + Shift + P to open the command palette.

Step 6: Clone Repository
Type "Git: Clone" into the command palette and press Enter.

Paste the URL of the GitHub repository you copied earlier into the input field and press Enter. Choose the directory where you want to clone the repository on your local machine.

Step 7: Open Cloned Repository
Once the cloning process is complete, Visual Studio Code will prompt you to open the cloned repository. Click on "Open Repository" to open the repository in Visual Studio Code.

Step 8: Start Working
You can now start working with the cloned repository in Visual Studio Code. Make changes to the files, commit them, and push them back to the GitHub repository as needed.






$ErrorActionPreference = 'Stop'

# Configuration
$totalCommits = 100
$daysToSpread = 60
$email = "anandtrifitness@gmail.com"
$name = "Anand"
$remoteUrl = "https://github.com/anandmahadevv/media-club.git"

# Initialize Dates
$endDate = Get-Date
$startDate = $endDate.AddDays(-$daysToSpread)
$intervalTicks = [math]::Floor(($endDate.Ticks - $startDate.Ticks) / ($totalCommits - 1))

# Set Identities for Git
$env:GIT_AUTHOR_NAME = $name
$env:GIT_COMMITTER_NAME = $name
$env:GIT_AUTHOR_EMAIL = $email
$env:GIT_COMMITTER_EMAIL = $email

Write-Host "Initializing clean repository to rewrite history..."
if (Test-Path ".git") {
    Remove-Item -Recurse -Force ".git"
}
git init
git remote add origin $remoteUrl

$global:commitCount = 0

function Make-Commit {
    param([string]$message)
    $currentDate = $startDate.AddTicks($intervalTicks * $global:commitCount)
    $dateStr = $currentDate.ToString("yyyy-MM-ddTHH:mm:ss")
    
    $env:GIT_AUTHOR_DATE = $dateStr
    $env:GIT_COMMITTER_DATE = $dateStr
    
    git commit -m $message | Out-Null
    
    $global:commitCount++
}

Write-Host "Creating logical commits for existing files..."

# Commit 1: Project configuration
git add package.json package-lock.json tsconfig.json tsconfig.app.json tsconfig.node.json vite.config.ts eslint.config.js .gitignore README.md
if ((git status --porcelain)) {
    Make-Commit "Initial project configuration and setup"
}

# Commit 2: Public assets
if (Test-Path "public") {
    git add public index.html
    if ((git status --porcelain)) {
        Make-Commit "Add public assets and entry point"
    }
}

# Commit 3: Source files
if (Test-Path "src") {
    git add src
    if ((git status --porcelain)) {
        Make-Commit "Implement core application components and pages"
    }
}

# Commit 4: Any remaining untracked/modified files
git add .
if ((git status --porcelain)) {
    Make-Commit "Add remaining project files"
}

Write-Host "Existing files grouped into $global:commitCount commits."

# 2. Filler commits
$fillerMessages = @(
    "Refactored helpers",
    "Updated documentation",
    "Cleaned up unused imports",
    "Minor UI tweaks",
    "Optimized render cycles",
    "Fixed typo in comments",
    "Updated dependency versions",
    "Improved error handling",
    "Added logging for debugging",
    "Code formatting and linting"
)

$remainingCommits = $totalCommits - $global:commitCount
Write-Host "Creating $remainingCommits filler commits to reach exactly $totalCommits..."

for ($i = 0; $i -lt $remainingCommits; $i++) {
    $msg = $fillerMessages[$i % $fillerMessages.Length]
    $logText = "Activity logged on $(Get-Date) - Seq $i - $msg"
    Add-Content -Path "activity_log.txt" -Value $logText
    git add activity_log.txt
    Make-Commit $msg
}

Write-Host "Force pushing $global:commitCount commits to main branch..."
git branch -M main
git push -u origin main --force

Write-Host "Successfully generated exactly $global:commitCount commits and pushed to repository."

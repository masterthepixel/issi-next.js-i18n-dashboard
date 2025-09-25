<#
.SYNOPSIS
    Converts all image files in public\images directory to WebP format
.DESCRIPTION
    This script scans the public\images directory and all subdirectories for 
    JPG, JPEG, PNG, and GIF files, then converts them to WebP format with 85% quality.
.NOTES
    File Name      : Convert-AllImagesToWebP.ps1
    Author         : Automated Performance Optimization
    Prerequisite   : ImageMagick installed and in PATH
#>

# Set variables
$sourceDir = "public\images"
$logFile = "conversion-log.txt"
$quality = 85

# Check if ImageMagick is installed
try {
    $magickVersion = convert -version 2>$null
    if (-not $magickVersion) {
        Write-Error "ImageMagick is not installed or not in PATH"
        Write-Error "Please install ImageMagick and ensure 'convert' command is available"
        exit 1
    }
}
catch {
    Write-Error "ImageMagick is not installed or not in PATH"
    Write-Error "Please install ImageMagick and ensure 'convert' command is available"
    exit 1
}

# Check if source directory exists
if (-not (Test-Path $sourceDir)) {
    Write-Error "Source directory not found: $sourceDir"
    exit 1
}

# Create log file
$logContent = "Image Conversion Log - $(Get-Date)`r`n"
$logContent += "=========================================`r`n"

# Get all image files
Write-Host "Scanning for images in $sourceDir..."
$images = Get-ChildItem -Path $sourceDir -Include *.jpg, *.jpeg, *.png, *.gif -Recurse -File

if ($images.Count -eq 0) {
    Write-Warning "No image files found in $sourceDir"
    exit 0
}

$total = $images.Count
$count = 0
$successCount = 0
$failedCount = 0

Write-Host "Found $total image files to convert"

foreach ($image in $images) {
    $count++
    $progress = [math]::Round(($count / $total) * 100, 2)
    
    Write-Progress -Activity "Converting images to WebP" -Status "Processing $count of $total ($progress%)" -PercentComplete $progress
    
    # Generate output filename
    $outputFile = "$($image.DirectoryName)\$($image.BaseName).webp"
    
    Write-Host "Converting: $($image.Name) -> $($image.BaseName).webp"
    
    try {
        # Convert to WebP with specified quality
        convert $image.FullName -quality $quality $outputFile
        
        if (Test-Path $outputFile) {
            $originalSize = [math]::Round($image.Length / 1KB, 2)
            $newSize = [math]::Round((Get-Item $outputFile).Length / 1KB, 2)
            $reduction = [math]::Round((1 - ($newSize / $originalSize)) * 100, 1)
            
            Write-Host "  [SUCCESS]: $originalSize KB -> $newSize KB ($reduction% reduction)" -ForegroundColor Green
            
            $logContent += "SUCCESS: $($image.FullName)`r`n"
            $logContent += "  Original: $originalSize KB`r`n"
            $logContent += "  WebP: $newSize KB`r`n"
            $logContent += "  Reduction: $reduction%`r`n"
            $logContent += "----------------------------------------`r`n"
            
            $successCount++
        }
        else {
            throw "Output file not created"
        }
    }
    catch {
        Write-Host "  [FAILED]: Failed to convert $($image.Name)" -ForegroundColor Red
        Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Red
        
        $logContent += "FAILED: $($image.FullName)`r`n"
        $logContent += "  Error: $($_.Exception.Message)`r`n"
        $logContent += "----------------------------------------`r`n"
        
        $failedCount++
    }
}

# Generate summary
$summary = @"
=========================================
CONVERSION SUMMARY
=========================================
Total files processed: $total
Successful conversions: $successCount
Failed conversions: $failedCount
Completion time: $(Get-Date)
Quality setting: $quality%
=========================================
"@

Write-Host $summary
$logContent += $summary

# Save log file
$logContent | Out-File -FilePath $logFile -Encoding UTF8
Write-Host "Conversion log saved to: $logFile"

# Optional: Remove original files (commented out for safety)
# Write-Host "Removing original files..."
# $images | Remove-Item -Force
# Write-Host "Original files removed"

Write-Host "Conversion process completed!"
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const sourceFile = path.join(__dirname, 'server', 'drizzle', 'schema.ts');
const destFile = path.join(__dirname, 'server', 'drizzle', 'schema.js');

function getFileHash(filePath) {
    const fileBuffer = fs.readFileSync(filePath);
    return crypto.createHash('sha256').update(fileBuffer).digest('hex');
}

// Check if the source file exists
if (fs.existsSync(sourceFile)) {
    // Check if the destination file exists
    if (fs.existsSync(destFile)) {
        const sourceHash = getFileHash(sourceFile);
        const destHash = getFileHash(destFile);

        // Compare hashes
        if (sourceHash === destHash) {
            console.log('Files are identical. No copy needed.');
            process.exit(0); // Exit without copying
        } else {
            console.log('Files differ. Copying the new file.');
        }
    } else {
        console.log('Destination file does not exist. Copying the new file.');
    }

    // Copy the file
    fs.copyFileSync(sourceFile, destFile);
    console.log('File copied successfully.');
} else {
    console.log('Source file does not exist.');
    process.exit(1); // Exit with an error
}

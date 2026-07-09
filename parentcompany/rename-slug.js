const fs = require('fs');
const path = require('path');

const oldPath = path.join(__dirname, 'app', 'blog', '%5Bslug%5D');
const newPath = path.join(__dirname, 'app', 'blog', '[slug]');

try {
    if (fs.existsSync(oldPath)) {
        fs.renameSync(oldPath, newPath);
        console.log('Successfully renamed %5Bslug%5D to [slug]');
    } else {
        console.log('%5Bslug%5D does not exist.');
    }
} catch (error) {
    console.error('Error renaming:', error);
}

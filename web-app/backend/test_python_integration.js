const { spawn } = require('child_process');
const path = require('path');

// Test direct Python execution
const pythonPath = 'C:/Python313/python.exe';
const pythonDir = path.join(__dirname, 'python');
const pythonScript = path.join(pythonDir, 'no_deps_generator.py');

console.log('Testing Python integration...');
console.log('Python path:', pythonPath);
console.log('Script path:', pythonScript);

const pythonProcess = spawn(pythonPath, [pythonScript, 'generate', 'https://example.com/job'], {
  timeout: 10000
});

let dataString = '';
let errorString = '';

pythonProcess.stdout.on('data', (data) => {
  dataString += data.toString();
  console.log('Python stdout:', data.toString());
});

pythonProcess.stderr.on('data', (data) => {
  errorString += data.toString();
  console.log('Python stderr:', data.toString());
});

pythonProcess.on('close', (code) => {
  console.log('Process exited with code:', code);
  console.log('Final output:', dataString);
  console.log('Final error:', errorString);
  
  if (code === 0 && dataString) {
    try {
      const result = JSON.parse(dataString);
      console.log('✅ Success:', result);
    } catch (e) {
      console.log('❌ Parse error:', e.message);
    }
  }
});

pythonProcess.on('error', (error) => {
  console.log('❌ Spawn error:', error.message);
});

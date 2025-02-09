import * as i2c from 'i2c-bus';

// I2C address of the MPU6050 sensor
const MPU6050_ADDRESS = 0x68; // Default I2C address of MPU6050

// Register addresses for gyroscope data (can be found in MPU6050 datasheet)
const GYRO_XOUT_H = 0x43; // High byte of gyroscope X-axis
const GYRO_YOUT_H = 0x45; // High byte of gyroscope Y-axis
const GYRO_ZOUT_H = 0x47; // High byte of gyroscope Z-axis

// Initialize the I2C bus
const i2cBus = i2c.openSync(1); // 1 for I2C bus 1 (Raspberry Pi default)

let gyroX: number; // Variable to store the X-axis gyroscope data
let gyroY: number; // Variable to store the Y-axis gyroscope data
let gyroZ: number; // Variable to store the Z-axis gyroscope data

function readGyroscopeData() {
  // Read 2 bytes for each axis (high and low bytes)
  gyroX = readGyroAxis(GYRO_XOUT_H);
  gyroY = readGyroAxis(GYRO_YOUT_H);
  gyroZ = readGyroAxis(GYRO_ZOUT_H);

  console.log(`Gyroscope X: ${gyroX} °/s`);
  console.log(`Gyroscope Y: ${gyroY} °/s`);
  console.log(`Gyroscope Z: ${gyroZ} °/s`);
}

// Function to read gyro axis data
function readGyroAxis(axisRegister: number): number {
  // Read the high and low byte from the register
  const highByte = i2cBus.readByteSync(MPU6050_ADDRESS, axisRegister);
  const lowByte = i2cBus.readByteSync(MPU6050_ADDRESS, axisRegister + 1);

  // Combine the two bytes to form a 16-bit value
  const combined = (highByte << 8) | lowByte;

  // Convert to signed value (2's complement)
  return combined >= 0x8000 ? combined - 0x10000 : combined;
}

// Initialize MPU6050 (write to the power management register to wake it up)
function initializeMPU6050() {
  i2cBus.writeByteSync(MPU6050_ADDRESS, 0x6B, 0); // Wake up the MPU6050 by writing 0 to the power management register
}

// Run initialization and periodic sensor data reading
initializeMPU6050();
setInterval(readGyroscopeData, 1000);

// Clean up when exiting
process.on('SIGINT', () => {
  console.log('Exiting...');
  i2cBus.closeSync();
  process.exit();
});

export { gyroX, gyroY, gyroZ }; // Export the gyroscope data variables
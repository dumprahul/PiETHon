import * as spi from 'spi-device';

// MCP3008 setup for Raspberry Pi (SPI communication)
const SPI_CHANNEL = 0; // SPI Channel 0 (CE0 pin)
const SPI_SPEED = 1350000; // Default SPI speed for Raspberry Pi
const MCP3008 = 0x00; // MCP3008 start byte for SPI transactions

// Setup SPI device
// ... existing code ...

const BUS_NUMBER = 0; // Replace with your bus number
const DEVICE_NUMBER = 0; // Replace with your device number

const spiDevice = spi.openSync(BUS_NUMBER, DEVICE_NUMBER);

// ... existing code ...
// Function to read from MCP3008 (channel 0)
function readCarbonSensorData() {
  const message = [
    {
      sendBuffer: Buffer.from([MCP3008, 0x00, 0x00]), // Request to read from channel 0
      receiveBuffer: Buffer.alloc(3),
      byteLength: 3,
      speedHz: SPI_SPEED,
    },
  ];

  // Send and receive data over SPI
  spiDevice.transferSync(message);

  // MCP3008 returns a 10-bit value (2 bytes of data)
  const sensorData = (message[0].receiveBuffer[1] & 0x03) << 8 | message[0].receiveBuffer[2];

  console.log(`Raw sensor value: ${sensorData}`);
  
  // Convert the sensor value to a real-world value (e.g., ppm)
  const ppm = sensorData * 5; // Example conversion (you may need a different formula)
  console.log(`Estimated CO concentration: ${ppm} ppm`);
}

// Periodically read sensor data (every 1 second)
setInterval(readCarbonSensorData, 1000);

// Clean up when exiting
process.on('SIGINT', () => {
  console.log('Exiting...');
  process.exit();
});

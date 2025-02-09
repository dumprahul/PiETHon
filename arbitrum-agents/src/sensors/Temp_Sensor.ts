import * as sensor from 'node-dht-sensor';

// Setup DHT11 or DHT22 sensor (Change to 22 if using DHT22)
const sensorType = 11; // 11 for DHT11, 22 for DHT22
const pin = 4; // GPIO Pin where the sensor is connected (e.g., GPIO4)

let temperature: number; // Variable to store the temperature
let humidity: number; // Variable to store the humidity

function readTemperature() {
  sensor.read(sensorType, pin, (err, temp, hum) => {
    if (err) {
      console.error('Failed to read sensor data:', err);
      return;
    }

    // Store the temperature and humidity
    temperature = temp;
    humidity = hum;

    // Log the temperature and humidity
    console.log(`Temperature: ${temperature.toFixed(2)}°C`);
    console.log(`Humidity: ${humidity.toFixed(2)}%`);
  });
}

// Read temperature every 2 seconds
setInterval(readTemperature, 2000);

// Clean up when exiting
process.on('SIGINT', () => {
  console.log('Exiting...');
  process.exit();
});

export { temperature, humidity }; // Export the temperature and humidity variables
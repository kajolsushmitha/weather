import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { AlertSubscription } from './models/AlertSubscription.js';
import cron from 'node-cron';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/Weather')
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jahaganapathi1@gmail.com', // Your email address
    pass: 'bkggefxqikzpbmke'
  }
});

// Function to send weather alerts
const sendWeatherAlerts = async () => {
  try {
    const subscribers = await AlertSubscription.find();
    
    for (const subscriber of subscribers) {
      // Fetch weather data for subscriber's location
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${subscriber.location}&appid=24eda372ca98c1a40cde6e83fa7cd3b5&units=metric`
      );
      const weatherData = await weatherResponse.json();

      const alertEmail = {
        from: process.env.EMAIL_USER,
        to: subscriber.email,
        subject: '⚡ WeatherPro Daily Alert',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">Weather Alert for ${subscriber.location} 🌡️</h2>
            <p>Hello ${subscriber.name},</p>
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin: 0 0 15px 0;">Current Weather Conditions:</h3>
              <p>🌡️ Temperature: ${Math.round(weatherData.main.temp)}°C</p>
              <p>🌥️ Condition: ${weatherData.weather[0].description}</p>
              <p>💧 Humidity: ${weatherData.main.humidity}%</p>
              <p>💨 Wind Speed: ${weatherData.wind.speed} m/s</p>
            </div>
          </div>
        `
      };

      await transporter.sendMail(alertEmail);
    }
    return true;
  } catch (error) {
    console.error('Error sending weather alerts:', error);
    return false;
  }
};

// Schedule daily weather alerts at 8 AM
cron.schedule('0 8 * * *', async () => {
  console.log('Sending scheduled weather alerts...');
  await sendWeatherAlerts();
});

// API Routes
app.post('/api/subscribe', async (req, res) => {
  try {
    const { name, email, location } = req.body;

    // Validate required fields
    if (!name || !email || !location) {
      return res.status(400).json({ message: 'Name, email, and location are required' });
    }

    // Create new subscription
    const subscription = new AlertSubscription({
      name,
      email,
      location
    });

    await subscription.save();

    // Send welcome email
    const welcomeEmail = {
      from: "jahaganapathi1@gmail.com",
      to: email,
      subject: 'Welcome to WeatherPro Alerts! 🌤️',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Welcome to WeatherPro Alerts! 🎉</h2>
          <p>Hello ${name},</p>
          <p>Thank you for subscribing to WeatherPro Alerts. You will now receive weather updates and alerts for ${location}.</p>
          <p>Stay prepared with our accurate weather forecasts!</p>
        </div>
      `
    };

    await transporter.sendMail(welcomeEmail);
    res.status(201).json({ message: 'Successfully subscribed to weather alerts' });
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(201).json({ message: 'Successfully subscribed to weather alerts' });
  }
});

// Manual trigger for weather alerts
app.post('/api/send-alerts', async (req, res) => {
  try {
    const success = await sendWeatherAlerts();
    if (success) {
      res.status(200).json({ message: 'Weather alerts sent successfully' });
    } else {
      res.status(500).json({ message: 'Failed to send weather alerts' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to send weather alerts' });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" }
});

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Socket.io Real-time Chat
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join_chat', (roomId) => {
        socket.join(roomId);
        console.log(`User joined room: ${roomId}`);
    });

    socket.on('send_message', (data) => {
        // RoomId would be bookingId or chatRoomId
        io.to(data.roomId).emit('receive_message', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/doctors', require('./routes/doctorRoutes'));
app.use('/api/labs', require('./routes/labRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/consultations', require('./routes/consultationRoutes'));
app.use('/api/hospitals', require('./routes/hospitalRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));

app.get('/', (req, res) => {
    res.json({
        message: 'Laablume API is running...',
        version: '1.0.0',
        documentation: 'https://github.com/your-username/laablume-backend',
        endpoints: {
            auth: [
                'POST /api/auth/request-otp',
                'POST /api/auth/verify-otp'
            ],
            doctors: [
                'GET /api/doctors',
                'GET /api/doctors/:id',
                'POST /api/doctors/profile (Protected)'
            ],
            labs: [
                'GET /api/labs',
                'GET /api/labs/:id/tests',
                'POST /api/labs/tests (Protected)'
            ],
            bookings: [
                'POST /api/bookings (Protected)',
                'GET /api/bookings/my (Protected)',
                'PUT /api/bookings/:id (Protected)'
            ],
            admin: [
                'GET /api/admin/analytics (Admin Only)',
                'GET /api/admin/pending (Admin Only)',
                'PUT /api/admin/approve/:type/:id (Admin Only)'
            ]
        },
        vercel_deployment_note: 'To host on Vercel, ensure vercel.json is present and MONGODB_URI is set in environment variables.'
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

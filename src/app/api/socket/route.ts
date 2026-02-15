
import { Server, Socket } from 'socket.io';
import { NextApiRequest, NextApiResponse } from 'next';

const ioHandler = (req: NextApiRequest, res: NextApiResponse & { socket: { server: { io: Server } } }) => {
  if (!res.socket.server.io) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const io = new Server(res.socket.server as any);
    res.socket.server.io = io;

    io.on('connection', (socket: Socket) => {
      console.log('a user connected');

      socket.on('start-ride', () => {
        console.log('starting ride');
        // Simulate driver movement
        let progress = 0;
        const interval = setInterval(() => {
          progress += 0.01;
          // In a real app, you'd get this from a database or a live feed
          // Here, we just move along a fixed path for demonstration
          const location = {
            lat: 34.052235 + progress,
            lng: -118.243683 + progress,
          };
          socket.emit('driver-location', location);

          if (progress >= 0.1) {
            clearInterval(interval);
          }
        }, 1000);
      });

      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    });
  }
  res.end();
};

export const GET = ioHandler;
export const POST = ioHandler;

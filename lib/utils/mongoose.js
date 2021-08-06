import mongoose from 'mongoose';

export function startDatabase(){
    mongoose.connect('mongodb://localhost:27017/hongthuan', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log('MongoDB connected!');
    });
}

const express = require('express');
const app = express();
const adminRouter = require('./routes/admin'); 
app.use('/admin', adminRouter); 


const userRouter = require('./routes/user'); 
app.use('/user', userRouter); 

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const adminRouter = require('./routes/admin'); 
app.use('/admin', adminRouter); 



const userRouter = require('./routes/user'); 
app.use('/user', userRouter); 

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

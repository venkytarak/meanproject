var express = require("express");
app = express();
bodyParser = require("body-parser");
var router = express.Router();
const ejs=require('ejs');


const { default: mongoose } = require("mongoose");
const { json } = require("body-parser");

// var mongoose = require("mongoose");
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended: true
}));
app.set("view engine", "ejs");

mongoose.connect("mongodb://127.0.0.1:27017/login",(err)=>{

if(err)

console.log("DB Not Connected-Error");

else

console.log("DB Connected");

});
// routing part

app.get('',(req,res)=>
{
    res.render('home')
});
app.get('homeR',(req,res)=>
{
    res.render('homeR')
});
app.get('/register',(req,res)=>
{
    res.render('register')
});


app.get('/courses',(req,res)=>
{
    res.render('courses')
});

app.get('/contact',(req,res)=>
{
    res.render('contact')
});
app.get('/html',(req,res)=>
{
    res.render('html')
});




app.get('/profile',(req,res)=>
{
    res.render('profile')
});

// app.get('/register',(req,res)=>
// {
//     res.render('register')
// });



// routing part
var db=mongoose.connection;
app.post('/sign_up', function(req,res){
    	var name = req.body.name;
    	var email =req.body.email;
    	var pass = req.body.password;
    	var phone =req.body.phone;
    
    	var data = {
    		"name": name,
    		"email":email,
    		"password":pass,
    		"phone":phone
    	}

    db.collection('details').insertOne(data,function(err, collection){
    		if (err) throw err;
    		console.log("Record inserted Successfully");
                
    	});
        
       
    	res.render('homeR',
		{
			name:data
		});
    })
    


	// cartdata storing 

	app.post('/addtocart', function(req,res){
		var course = req.body.course;
		var time = req.body.time;
		var cost = req.body.cost;0
		
		var data = {
			"course": course,
			"time": time,
			"cost": cost
		}
		db.collection('detailss').insertOne(data,function(err, collection){
			if (err) throw err;
			console.log("Record inserted Successfully");
				
		});
		// res.send('done')
		res.render('succes')
		
	});

	// app.post('/addtocart', function(req,res){
	// 	var course = req.body.course;
	// 	var time = req.body.time;
	// 	var cost = req.body.cost;0
		
	// 	var data = {
	// 		"course": course,
	// 		"time": time,
	// 		"cost": cost
	// 	}
	// 	db.collection('products').insertOne(data,function(err, collection){
	// 		if (err) throw err;
	// 		console.log("Record inserted Successfully");
				
	// 	});
	// 	// res.send('done')
	// 	res.render('succes')
		
	// });
	

	// retriving cart data







	
const detailsSchema=
	{
		name:String,
		email:String,
		phone:Number

	}

	const detail=mongoose.model('detail',detailsSchema);

	app.get('/user',(req,res)=>
{
	detail.find({},function(err,details)
		{
			// console.log(json(details))
			
    res.render('user',
	{
		data:details
	})
	
})
})
	

	
const detailssSchema=
	{
		course:String,
		time:String,
		cost:Number

	}

	const d=mongoose.model('d',detailssSchema);

	app.get('/cart',(req,res)=>
{
	d.find({},function(err,courses)
		{
		var c=json(courses)
		console.log(c)
		if (err) 
		{
			console.log(err)
		}
		else{
		data:courses
		console.log(data.course)
		}

    // res.render('cart',
	// {
	// 	data:courses

	// })
	
})


})
	


	// retriving code ends


	// cartdata end

app.listen(4000, "localhost", function () {
	console.log("server has started");
	})
    module.exports = router;


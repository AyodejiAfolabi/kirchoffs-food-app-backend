let express=require('express');
const app= express();
const ejs=require('ejs')
// app.use(express.static(''))
const bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine',"ejs")
let allStudents=[
    // {firstname:1,lastname:'first post',email:'this is my first post'},
]
let allTodos=[]
app.get('/',(req,res)=>{
// res.sendFile(__dirname+"/index.html")
res.render("first", {allStudents})

})

app.get('/signup',(req,res)=>{
	// res.sendFile(__dirname+"/index.html")
	res.render("form")
	
	})
	app.post('/signup',(req,res)=>{
		allStudents.push(req.body)
		res.render('first',{allStudents})
		})
		app.get('/todo',(req,res)=>{
			res.render('todo',{allTodos,index:false})
			})
		app.post('/update',(req,res)=>{
			let index=req.body.ind
		console.log(index)
			console.log(allStudents)
		allStudents[index]=req.body
		
		res.redirect('/')

			})
		app.post('/edit',(req,res)=>{
			console.log(allStudents)
		let index=req.body.ind
let currentStudent=allStudents[index]
console.log(currentStudent)
			res.render('edit',{currentStudent,index})
			})
			app.post('/addtodo',(req,res)=>{
				let todo=req.body.todo
				allTodos.push(todo)
			res.render('todo',{allTodos,index:false})

				console.log(allTodos)
			})
			app.post('/deleteTodo',(req,res)=>{
let deleteIndex=req.body.ind
let filtered=allTodos.filter((each,i)=>
(i!=deleteIndex)			
)
				
allTodos=filtered
res.render('todo',{allTodos,index:false})
				
			})
			app.post('/editTodo',(req,res)=>{
				// console.log(allStudents)
			let index=req.body.ind
	let currentTodo=allTodos[index]
	console.log(currentTodo,index)
				res.render('todo',{allTodos,index})
				})
				app.post('/editedTodo',(req,res)=>{
					let todo=req.body.todo
						let index=req.body.ind
			allTodos[index]=todo
						res.render('todo',{allTodos,index:false})
						})

		app.post('/delete',(req,res)=>{
			let deleteIndex=req.body.ind
			let filtered=allStudents.filter((each,i)=>
			 (i!=deleteIndex)			
			)
			
			allStudents=filtered
			res.redirect('/')

		})
		
	


app.listen(4000,()=>{
	console.log('running on port 4000');
})
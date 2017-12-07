var express = require('express')
var session = require ('cookie-session')
var bodyparser = require ('body-parser')

var urlencodedparser = bodyparser.urlencoded({extended: false });

var app = express();

/* on utilise les sessions */

app.use (session({secret:'todotopsecret'}))

/*s'il n ya pas de todo list on en cree une vide sous forme d'array avant la suite */
.use(function(req, res, next){
	if(typeof(req.session.todolist) == 'undefined')
	{
		typeof(req.session.todolist) == [];
	}
	next();
})




/* affichage du formulaire  */

.get('/todo', function(req, res){
	res.render ('todo.ejs',{ todolist : req.session.todolist});
})

//on ajoute un element a la todolist

.post('todo/ajouter', urlencodedparser, function(req, res){
	if(req.body.newtodo != ''){
		req.session.todolist.push(req.body.newtodo);
	}
	res.redirect('/todo');
})
//on supprime un element de la todolist
.get('/todo/supprimer/:id', function(req, res){
if(req.params.id == ''){
	req.session.todolist.splite(req.params.id,1);
}
	res.redirect('/todo')
})
//on redirige vers la todolist si jamais le chemain demandé nest pas trouvé 

.get('todo', function(req, res){
	res.redirect('/todo');
})

.listen(8080, () => {
	console.log('server listening, Zack mli7..');
});
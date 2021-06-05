const bodyparser =  require('body-parser');
const express= require('express');
const Block= require('./BlockChain');
const chain= new Block.Blockchain();
const port= 8000;
app= express();

app.get('/block/:height', async(req, res) => {
  res.send(await chain.getBlock(req.params.height));

})
app.use(bodyparser.json());

app.post('/block', async(req,res)=>{
	if(req.body.body===''|| req.body.body===undefined){
		res.send({message:"enter the body"})
	}else{
	await chain.addBlock(new Block.Block(req.body.body));
	const height= await chain.getBlockHeight();
	const response= await chain.getBlock(height);
	res.send(response);}	
})

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})



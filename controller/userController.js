const users={};
const createUser=(req,res)=>{
    try {
        
    const {name,email,age}=req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
        return res.status(400).json({success:false,message:"Invalid email format"})
    }
    if( !name ||!email || !age){
        return res.status(400).json({success:false,message:"Please enter required fields."});
    }
    for(const user of Object.values(users)){
        if(user.email===email){
            return res.status(400).json({success:false,message:"Email already exists"})
        }
        
    }
    
    const uuid=crypto.randomUUID();
    users[uuid]={
        id:uuid,
        name,
        email,
        age
    }
    res.status(201).json({success:true,message:"User created successfully",user:users[uuid]});
    } catch (error) {
        res.status(500).json({success:false,error:error.message})
    }
    
}
const getUsers=(req,res)=>{
    try {
        if(!users){
            res.status(400).json({success:false,message:"No users in the memory"})
        }
        res.status(200).json({success:true,message:"User fetched successfully",users:users})
    } catch (error) {
        res.status(500).json({success:false,error:error.message})
    }
}
const getUser=(req,res)=>{
    try {
        const uuid=req.params.id;
        if(!uuid){
            res.status(400).json({success:false,message:"Please enter user id"})
        }
        
        if(!users[uuid]){
            return res.status(404).json({success:false,message:"User not found"});
        }
        res.status(200).json({success:true,message:"User fetched successfully",user:users[uuid]});
    } catch (error) {
        res.status(500).json({success:false,error:error.message})
    }
}
const updateUser=(req,res)=>{
    try {
        const{name,email,age}=req.body
        const id=req.params.id;
        if(!users[id]){
             return res.status(404).json({success:false,message:"User not found"});
        }
        else {
  if (name !== undefined) users[id].name = name;
  if (email !== undefined) users[id].email = email;
  if (age !== undefined) users[id].age = age;
}
        res.status(200).json({success:true,message:"User updated successfully",updatedUser:users[id]});
    } catch (error) {
        res.status(500).json({success:false,error:error.message})
    }
}
const deleteUser=(req,res)=>{
    try {
        const id=req.params.id;
        if(!users[id]){
            return res.status(404).json({success:false,message:"User not found"});
        }
        delete users[id];
        res.status(204).json({success:true,message:"User deleted successfully"})
    } catch (error) {
        res.status(500).json({success:false,error:error.message})
    }
}
module.exports={users,createUser,getUsers,getUser,updateUser,deleteUser}
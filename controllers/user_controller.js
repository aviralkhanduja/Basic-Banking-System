const Transaction=require('../models/transaction');
const User=require('../models/user');
const Review=require('../models/review');
exports.displaySpecificTransactions=function(req,res){
    User.findById(req.user._id).populate('transactions').exec(function(err,trans_list){
        if(err){
            console.log('error=',err);
            return res.redirect('/user/home');
        }
        console.log('trans_list=',trans_list.transactions);
        return res.render('transaction',{transactions:trans_list.transactions});
    });
    /*
    Transaction.find({$or:[{semail:req.user.email},{remail:req.user.email}]},function(err,trans_list){
        if(err){
            console.log('error in displaying transactions');
            return res.redirect('/user/home');
        }
        return res.render('transaction',{transactions:trans_list});
    });
    */
};
exports.displayHomeSpecific=function(req,res){
   return res.render('home');
};
exports.addGold=function(req,res){
    const gold=47400;
    const val=req.user.gold+(req.body.money/gold);
    if(req.body.money<0||req.user.balance<req.body.money)
    return res.redirect('/user/home');
       
    User.findByIdAndUpdate(req.user._id,{gold:val,$inc:{balance:-req.body.money}},function(err,user){
        if(err){
            console.log('Error while purchasing gold');
        }
        Transaction.create({sender:req.user.name,receiver:user.name,semail:req.user.email,remail:user.email,amount:req.body.money,description:'Purchased Gold'},function(err,trans){
            if(err){
                console.log('Error while purchasing gold');
            }
            user.transactions.push(trans._id);
            user.save();
        });
        return res.redirect('/user/home');
    });
};
exports.makeTransaction=function(req,res){
    if(req.body.money<0||req.user.balance<req.body.balance)
    return res.redirect('/user/home');
    User.findOneAndUpdate({email:req.body.email},{$inc:{balance:req.body.money}},function(err,user){
        if(err){
            console.log('Error while making transaction_1');
        }
        else{
            Transaction.create({sender:req.user.name,receiver:user.name,semail:req.user.email,remail:user.email,amount:req.body.money,description:`${req.user.name} sent ${req.body.money} to ${req.body.name}`},function(err,trans){
                if(err){
                    console.log('Error while making transaction_2');
                }
                User.findByIdAndUpdate(req.user._id,{$inc:{balance:-req.body.money}},function(err,sendinguser){
                    if(err){
                        console.log('Error while making transaction_3');
                    }
                    sendinguser.transactions.push(trans._id);
                    user.transactions.push(trans._id);
                    sendinguser.save();
                    user.save();
                });
            });
        }
    }); 
    return res.redirect('/user/home');
};
exports.deleteUser=function(req,res){
    User.deleteOne({_id:req.user._id},function(err){
        if(err){
            console.log('err while deleting',err);
        }
        return res.redirect('/');
    });
};
exports.endSession=function(req,res){
    console.log('Bye bye bhai ji!');
    req.logout();
    return res.redirect('/');
};
exports.review=function(req,res){
    res.render('review',{success:undefined});
};
exports.createReview=function(req,res){
    req.body.user=req.user._id;
    Review.create(req.body,function(err,entry){
        if(err){
            console.log('Problem while storing review')
            return res.render('review',{success:false});
        }
        return res.render('review',{success:true});
    });
};  
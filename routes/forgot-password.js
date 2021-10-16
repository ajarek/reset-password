const router =require('express').Router()
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config')


router.get('/', (req, res) => {
    res.render('home')
})
router.get('/forgot-password', (req, res, next) => {
    res.render('forgot-password')
})
router.post('/forgot-password', (req, res, next) => {
    const {email} = req.body 
    //Upewnij się, że użytkownik istnieje w bazie danych
    if(email !==user.email){
        res.send('Użytkownik nie został zarejestrowany!')
       return
    }
    //Użytkownik istnieje, trzeba utworzyć połączenie jednorazowe ważne przez 15 minut
       const secret = JWT_SECRET + user.password
       const payload={
           email:user.email,
           id:user.id
       }
       const token = jwt.sign(payload,secret,{expiresIn:'15m'})
       const link = `http://localhost:3000/reset-password/${user.id}/${token}`
       console.log(link)
       res.send('Link resetowania hasła został wysłany na Twojego e-maila ')
})
router.get('/reset-password/:id/:token', (req, res, next) => {
const {id,token} = req.params

//Sprawdź, czy ten identyfikator istnieje w bazie danych
if(id !== user.id){
    res.send('Nieważny id...')
    return
}
//Mamy ważny identyfikator i mamy ważnego użytkownika do identyfikatora
const secret = JWT_SECRET + user.password
try{
const payload = jwt.verify(token, secret)
res.render('reset-password',{email:user.email})
}
catch(error){
    console.log(error.message)
    res.send(error.message)
}
})

router.post('/reset-password/:id/:token', (req, res, next) => {
    const {id,token} = req.params
    const {password,password2} = req.body
    //Sprawdź, czy ten identyfikator istnieje w bazie danych
if(id !== user.id){
    res.send('Nieważny id...')
    return
}
const secret = JWT_SECRET + user.password
try{
    const payload = jwt.verify(token, secret)
    //Sprawdź hasło i hasło 2 powinny być zgodne
    //Możemy po prostu znaleźć użytkownika z e-mailem i identyfikatorem zawarte w "payload" i wreszcie zaktualizować nowe hasło
    //zawsze hashuj hasło wcześniej

    user.password = password
    res.send(user)
}
catch(error){
    console.log(error.message)
    res.send(error.message)
}
})
module.exports=router
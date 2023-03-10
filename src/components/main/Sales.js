import { SalesModal } from "./SalesModal";
import { useState } from "react";
import Autobus from './autobusy.png'
import TIR from './fordtir.jpg'
import HappyHours from './happy-hour.jpg'
import KDR from './kdr_grafika.jpg'
import { FaCarAlt, FaInfo, FaInfoCircle } from "react-icons/fa";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import pic from "./output-onlinepngtools(2).png";
import { Footer } from "./Footer";

export function Sales(){
  const [modalShow1, setModalShow1] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const [modalShow3, setModalShow3] = useState(false);
  const [modalShow4, setModalShow4] = useState(false);

    return <div style={{marginTop:80}}>
       <hr ></hr>
        <div style={{textAlign:'center'}}><h2 >Promocje</h2>
        </div>
        <hr ></hr>

        <div style={{textAlign:'center',marginleft:'auto',marginRight:'auto'}}>
            <h4 >Karta SobRent</h4>
            <Grid style={{display:'flex',justifyContent: 'center'}}>
            <Card id={"card"} style={{ width: 350 , height: 200, borderRadius: 10, backgroundColor:'#CD5C5C'}} >
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
              <img src={pic} alt="RentCar Logo" style={{ width:180, height:180,marginTop:-10, marginBottom: -80, marginLeft: 170}} class="rounded-pill"/>  
              </Typography>
              <Typography variant="h6" color="text.secondary">
                <hr style={{marginBottom:0}}></hr>
                <span style={{marginBottom: 0,marginLeft: 150}}>004 665 444 321</span>
                <hr style={{marginTop:0}}></hr>
                <div style={{marginLeft: 230, marginTop: -15}}><FaCarAlt style={{display: 'inline-block'}}></FaCarAlt><h6 style={{display: 'inline-block', marginLeft:5}}>5665</h6></div>
              </Typography>
            </CardContent>
            </Card>
            </Grid>
            <FaInfoCircle onClick={() => setModalShow1(true)} style={{margin: 'auto', marginTop:10}} size={30}/>
            <SalesModal show={modalShow1} onHide={() => setModalShow1(false)} header="Karta SobRent" 
            text={<span>Posiadacze naszej karty SobRent mog?? liczy?? na zni??ki w zale??no??ci od ilo??ci posiadanych na niej punkt??w, comiesi??cznych promocji, kt??re s?? dost??pne tylko tutaj oraz 5% rabatu na wszystkie zam??wienia po dokonaniu 10 wypo??ycze??!
            <span><br></br><FaCarAlt size = {30}/><b>100000 - 50% zni??ki</b></span>
            <br></br>
            <FaCarAlt size = {30}/><b>50000 - 30% zni??ki</b>   
            <br></br>
            <FaCarAlt size = {30}/><b>25000 - 20% zni??ki</b>
            <br></br>
            <FaCarAlt size = {30}/><b>10000 - 5% zni??ki</b></span>}/>
        </div>
        <hr></hr>
        <div style={{textAlign:'center'}}>
            <h4 >Karta Du??ej Rodziny</h4>
            <img src={KDR} alt="Karta Du??ej Rodziny" width={300} height={200}></img>
            <br></br>
            <FaInfoCircle onClick={() => setModalShow2(true)} style={{margin: 'auto', marginTop:10}} size={30}/>
            <SalesModal show={modalShow2} onHide={() => setModalShow2(false)} header="Karta Du??ej Rodziny" text="Posiadacze karty du??ej rodziny maj?? wi??cej! Wspieramy polskie rodziny!
             Po okazaniu Karty Du??ej Rodziny w zam??wieniu, w kt??rym wyst??puje/?? samoch??d/y z kategorii SUV, udzielamy zni??ki w wysoko??ci 10% na dany/e samoch??d/samochody!"/>
        </div>
        <hr></hr>
        <div style={{textAlign:'center'}}>
            <h4 >Kierowcy ci????ar??wek oraz autobus??w/autokar??w</h4>
            <img src={Autobus} alt="Autobus" style={{display: 'inline-block'}} height={200}></img>
            <img src={TIR} alt="Ci????ar??wka" style={{display: 'inline-block'}} width={350} height={200}></img>
            <br></br>
            <FaInfoCircle onClick={() => setModalShow3(true)} style={{margin: 'auto', marginTop:10}} size={30}/>
            <SalesModal show={modalShow3} onHide={() => setModalShow3(false)} header="Kierowcy autobus??w oraz autokar??w" text="Kierowcy autobus??w oraz autokar??w je??dz?? taniej!
          Po okazaniu prawa jazdy na podnay wy??ej typ pojazdu, zostanie naliczony rabat w wysoko??ci 10% na dane zam??wienie! "/>
        </div>
        <hr></hr>
        <div style={{textAlign:'center'}}>
            <h4 > Happy Hours</h4>
            <img src={HappyHours} alt="Happy Hours" width={200} height={200}></img>
            <br></br>
            <FaInfoCircle onClick={() => setModalShow4(true)} style={{margin: 'auto', marginTop:10}} size={30}/>
            <SalesModal show={modalShow4} onHide={() => setModalShow4(false)} header="Happy Hours" text="Od poniedzia??ku do pi??tku w godzinach 14:00 - 16:00, nasi klienci mog?? liczy?? na rabat w wysoko??ci 5% na ka??de z??o??one zam??wienie! "/>
        </div>
      <br></br>
      <p>Aby uzyska?? spersonaliowane i wi??ksze rabaty za?????? konto i do????cz do spo??eczno??ci SobRent!</p>
      <br></br>
      <Footer></Footer>
    </div>
}
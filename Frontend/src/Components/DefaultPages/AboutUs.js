import { Icon } from '@iconify/react'
import React from 'react'

function AboutUs() {
  return (

<section class=" text-center text-lg-start">
 
  <div class="card mb-3">
    <div class="row g-0 d-flex align-items-center" >
      <div class="col-lg-4 d-none d-lg-flex">
        <img src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg" alt="Trendy Pants and Shoes"
          class="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5" />
      </div>
      <div class="col-lg-8" >
      <img src="../src/Assests/mobileimg.jpeg" alt="" />
      <h1  style={{ color: 'hsl(218, 41%, 40%)' }}> Mobile Phone Reparing Center</h1>
      
      <h3  style={{ color: 'hsl(218, 41%, 50%)' }}>We Known For</h3>
      <div  style={{ color: 'hsl(218, 81%, 40%)' }}>
      <h5>Fast Service</h5>
      <h5>Good Technicians</h5>
      <h5>All type Devices Service</h5>
      <h5>Customer Statisfication</h5>
      
      </div>
      
      <p style={{paddingTop:80}}>Application Designed by : Ankush Darade & Pankaj Darade</p>
      </div>


    </div>
  </div>
</section>


  )
}

export default AboutUs

{/* <div style={{backgroundImage: "url(/src/Assests/mobileImg.jpeg)" }}>
<h1 className='mx-auto' style={{width:'15%'}}>About us</h1>
<div style={{  display:'flex',flexDirection:'row'}}>
    <div style={{flex:1,border:'1px solid black',padding:'1%'}}>
        We Provide Fastest service in the industry
        <br></br>
        <ul style={{listStyleType:'none'}} >
            <li><Icon  style={{color:'#47b2e4'}}icon="ri:check-double-line" /> Fast Service</li>
            <li><Icon  style={{color:'#47b2e4'}}icon="ri:check-double-line" /> Good Technicians</li>
            <li><Icon  style={{color:'#47b2e4'}}icon="ri:check-double-line" /> Multipal Device Care</li>
            <li><Icon  style={{color:'#47b2e4'}}icon="ri:check-double-line" /> Happy Customer</li>
        </ul>
    </div>

    <div style={{flex:1,border:'1px solid black',padding:'1%'}}></div>
</div>

</div> */}
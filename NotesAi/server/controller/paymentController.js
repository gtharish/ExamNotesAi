import Stripe from "stripe"
import User from "../model/user.model.js"
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
import "dotenv/config";
// amount: "₹199"
// credits: 350
// planId: "pro_student"
console.log(
  "Stripe key exists:",
  !!process.env.STRIPE_SECRET_KEY
);
const plans = {
 pro_student: {
    credits: 350,
    amount: 200,
    name: "Pro Student",
  },

  ranker_pack: {
    credits: 1000,
    amount: 500,
    name: "Ranker Master Pack",
  },
};

export const createCheckoutSession = async (req, res) => {
  try {
    const plan  = req.body;
  
  
    const selectedPlan = plans[plan.planId]

    if (!selectedPlan) {
      return res.status(400).json({
        success: false,
        message: "Invalid plan",
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "inr",

            product_data: {
              name: `ExamNotes AI - ${selectedPlan.name}`,
            },

            unit_amount: selectedPlan.amount *100,
          },

          quantity: 1,
        },
      ],

      success_url:
        `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url:
        `${process.env.CLIENT_URL}/payment-failed`,

      metadata: {
        userId: String(req.userId),
    
        credits: String(selectedPlan.credits),
      },
    });

    return res.status(200).json({
      success: true,
      url: session.url,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Unable to create checkout session",
    });
  }
};

export const stripeWebhook = async(req,res)=>{
  const sig = req.headers["stripe-signature"]
  let event;
  try{
   event = stripe.webhooks.constructEvent(
    req.body,sig,process.env.STRIPE_WEBHOOK_SECRET
   )
  }catch(e){
    console.log("webhook signature error:",e.message)
    return res.status(400).send("webhook error");
  }
  if(event.type === "checkout.session.completed"){
    const session = event .data.object;
    const userId = session.metadata.userId;
    const creditsToAdd = Number(session.metadata.credits)

    if(!userId || !creditsToAdd){
      return res.status(400).json({message:"Invalid metadata"})

    }
    const user = await User.findByIdAndUpdate(userId,{
      $inc:{credit:creditsToAdd},
    $set:{isCreditAvailable:true}
    },{new:true})
  }
  res.status(200).json(
    {
      message:"credit point add successfully",
      success:true
      
    }
  )
}
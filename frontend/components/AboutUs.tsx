import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

function AboutUs() {
  return (
    <section>
      <h1 className="text-3xl font-semibold text-gray-700 dark:text-gray-50">
        About us
      </h1>
      <div>
        <Accordion
          type="single"
          collapsible
          className="w-full flex flex-col items-center justify-center  "
        >
          <div className="w-full sm:w-1/2 p-2">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg hover:no-underline">
                Overview
              </AccordionTrigger>
              <AccordionContent>
                Welcome to{" "}
                <span className="text-purple-700 font-semibold italic">
                  Travely!
                </span>{" "}
                Embark on a journey with us, where we are not just a travel
                platform;{" "}
                <span className="text-slate-900 font-semibold italic">
                  we are your passport
                </span>{" "}
                to a seamless and unforgettable travel experience. Offering a{" "}
                {""}
                <span className="text-slate-900 font-semibold italic">
                  one-stop solution
                </span>
                , Travely simplifies the art of travel by providing hassle-free
                bookings for{" "}
                <span className="text-slate-900 font-semibold italic">
                  flights, luxurious hotels, and convenient taxi transfers
                </span>
                . Your adventure begins with us let{" "}
                <span className="text-purple-700 font-semibold italic">
                  Travely
                </span>{" "}
                be your trusted companion in exploring the world.
              </AccordionContent>
            </AccordionItem>
          </div>
          <div className="w-full sm:w-1/2 p-2">
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg hover:no-underline">
                Our Mission
              </AccordionTrigger>
              <AccordionContent>
                At{" "}
                <span className="text-purple-700 font-semibold italic">
                  Travely
                </span>
                , we are on a mission to{" "}
                <span className="text-slate-900 font-semibold italic">
                  redefine travel planning
                </span>
                . We believe that every journey should be a{" "}
                <span className="text-slate-900 font-semibold italic">
                  seamless blend of excitement and ease
                </span>
                . Our commitment is to make your travel experience not just
                effortless, but truly enjoyable. We pride ourselves on offering
                a myriad of options and providing unparalleled service to cater
                to the diverse needs of our cherished customers. From
                <span className="text-slate-900 font-semibold italic">
                  personalized recommendations to top-notch assistance
                </span>
                ,{" "}
                <span className="text-purple-700 font-semibold italic">
                  Travely
                </span>{" "}
                is here to turn your travel dreams into delightful memories.
              </AccordionContent>
            </AccordionItem>
          </div>
          <div className="w-full sm:w-1/2 p-2">
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg hover:no-underline">
                Customer Satisfaction
              </AccordionTrigger>
              <AccordionContent>
                We{" "}
                <span className="text-slate-900 font-semibold italic">
                  prioritize
                </span>{" "}
                customer satisfaction and{" "}
                <span className="text-slate-900 font-semibold italic">aim</span>{" "}
                to exceed expectations in every aspect of your journey. Our team
                is{" "}
                <span className="text-slate-900 font-semibold italic">
                  committed
                </span>{" "}
                to ensuring your travel experience is{" "}
                <span className="text-slate-900 font-semibold italic">
                  smooth
                </span>
                ,{" "}
                <span className="text-slate-900 font-semibold italic">
                  reliable
                </span>
                , and{" "}
                <span className="text-slate-900 font-semibold italic">
                  memorable
                </span>
                . With every interaction,{" "}
                <span className="text-purple-700 font-semibold italic">
                  Travely
                </span>{" "}
                strives to make your journey extraordinary.
              </AccordionContent>
            </AccordionItem>
          </div>
          <div className="w-full sm:w-1/2 p-2">
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg hover:no-underline">
                Contact Us
              </AccordionTrigger>
              <AccordionContent>
                Have questions or need assistance? Contact our{" "}
                <span className="text-purple-700 font-semibold italic">
                  friendly
                </span>{" "}
                support team at{" "}
                <a
                  href="mailto:support@travely.com"
                  className="text-purple-700 font-semibold italic"
                >
                  support@travely.com
                </a>
                . We are here to help you with any{" "}
                <span className="text-slate-900 font-semibold italic">
                  inquiries
                </span>{" "}
                or{" "}
                <span className="text-slate-900 font-semibold italic">
                  concerns
                </span>
                . Let{" "}
                <span className="text-purple-700 font-semibold italic">
                  Travely
                </span>{" "}
                be your guiding companion on your travel journey.
              </AccordionContent>
            </AccordionItem>
          </div>
        </Accordion>
      </div>
    </section>
  );
}

export default AboutUs;

/** Contact Component  
 *  Description: This section contains a contact form allowing users to send messages via EmailJS.
 */

import React, { useState, useRef } from "react";
import RevealOnScroll from "../_components/RevealOnScroll";
import emailjs from "@emailjs/browser";

const Contact = () => {
    const formRef = useRef(null);
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });

    // Load environment variables
    const PUBLIC_KEY = process.env.NEXT_PUBLIC_PUBLIC_KEY;
    const SERVICE_ID = process.env.NEXT_PUBLIC_SERVICE_ID;
    const TEMPLATE_ID = process.env.NEXT_PUBLIC_TEMPLATE_ID;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    /* Debugging (Only in development mode) */
    if (process.env.NODE_ENV === "development") {
        console.log("SERVICE_ID:", SERVICE_ID);
        console.log("TEMPLATE_ID:", TEMPLATE_ID);
        console.log("PUBLIC_KEY:", PUBLIC_KEY);
    }

    /** Handle input changes */
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!PUBLIC_KEY || !SERVICE_ID || !TEMPLATE_ID) {
            alert("EmailJS configuration is missing. Please check your .env.local file.");
            return;
        }

        if (!formRef.current) return;

        console.log("Sending EmailJS Request...");
        console.log("SERVICE_ID:", SERVICE_ID);
        console.log("TEMPLATE_ID:", TEMPLATE_ID);
        console.log("PUBLIC_KEY:", PUBLIC_KEY);

        /** Send form data using EmailJS */
        emailjs
            .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
            .then((result) => {
                console.log("✅ Email sent successfully:", result);
                alert("Message sent successfully!");
                setFormData({ name: "", email: "", message: "" });
            })
            .catch((error) => {
                console.error("❌ EmailJS Error:", error);
                alert("Oops! Something went wrong. Please check the console for details.");
            });
    };

    return (
        /** Contact Section */
        <section id="contact">

            <div className="relative top-[260px] w-full h-[550px] bg-light-blue flex flex-col justify-center items-center 
                shadow-[inset_0px_1px_3px_rgba(0,0,0,0.12),_0px_2px_4px_rgba(0,0,0,0.08)]">
                <RevealOnScroll>
                    <div className="w-150 px-4 relative top-[-50px]">
                        <h2 className="text-center text-4xl font-bold text-primary-blue mt-12">Let's Talk</h2>
                        <p className="text-lg font-segoe-ui text-gray-300 leading-relaxed text-center mt-4">
                            Open to collaborations and new opportunities. Let's connect!
                        </p>
                        <form ref={formRef} className="mt-6 space-y-4" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                className="w-full bg-primary-blue/5 border border-white/10 rounded px-4 py-3 text-primary-blue transition focus:outline-none focus:border-primary-blue focus:bg-primary-blue/5 shadow-md"
                                placeholder="Name..."
                                onChange={handleChange}
                            />

                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                className="w-full bg-primary-blue/5 border border-white/10 rounded px-4 py-3 text-primary-blue transition focus:outline-none focus:border-primary-blue focus:bg-primary-blue/5 shadow-md"
                                placeholder="Your email..."
                                onChange={handleChange}
                            />

                            <textarea
                                name="message"
                                required
                                value={formData.message}
                                rows={5}
                                className="w-full bg-primary-blue/5 border border-white/10 rounded px-4 py-3 text-primary-blue transition focus:outline-none focus:border-primary-blue focus:bg-primary-blue/5 shadow-md"
                                placeholder="Message..."
                                onChange={handleChange}
                            />

                            <div className="w-full flex justify-center">
                                <button type="submit" className="bg-primary-blue text-light-yellow py-3 px-6 rounded font-medium transition hover:shadow-lg">
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
};

export default Contact;
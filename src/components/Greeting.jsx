function Greeting() {
    const [message, setMessage] = useState("");
    
    function messageGreeting(event) {
        const formData = new FormData(event.target);
        const name = formData.get("name");

        const hour = new Date().getHours();
        let greeting;
    
        if (hour < 12) {
        greeting = "Good morning";
        } else if (hour < 18) {
        greeting = "Good afternoon";
        } else {
        greeting = "Good evening";
        }
    
        setMessage(`${greeting}, ${name}`);
    }}
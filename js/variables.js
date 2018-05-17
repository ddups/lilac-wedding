/**
 * Javascript template variables
 */

var	isDebug = true,

    mobileMenuTitle = "Menu",					//The title of the mobile menu
	
	hero100PercentHeight = false,				//If true, the hero section (home) will be set with a minimum height of 100% window height. If false, hero height will be the height of its content.
	
	//TWITTER VARIABLE
	twitter_username = "Envato",				//Replace with your own Twitter username
	
	
	//CONTACT FORM VARIABLES
	contact_form_success_msg = "Form successfully submitted! :)",
	contact_form_error_msg = "Error sending message :(",
	
	
	//COUNTDOWN VARIABLES
	c_days = "DAYS",							//Countdown "Days" label
	c_hours = "HOURS",							//Countdown "Hours" label
	c_minutes = "MIN.",							//Countdown "Minutes" label
	c_seconds = "SEC.",							//Countdown "Seconds" label
    countdownEndMsg = "The Day is Here!!",		//Message to display when the countdown reaches the end
    
    // SCHEDULE VARIABLES
    friEvents = [
        {
            time: '4:00 PM', 
            title: 'Open Check&#8209In',
            text: `Stop by the main office any time after 4 pm and grab your info bag. This will contain a map of the camp, as well as some other information that will also be listed on the bulletin board. Find your cabin and get yourself settled, and then the camp is yours to explore!`,
        },
        {
            time: '7:00 PM', 
            title: `L'Après Dîner`,
            text: `Join us in the Rec Center after the rehearsal dinner for drinks, dancing, and mingling! This will be super casual so feel free to make your own plans for dinner and show up whenever.`,
        },
        {
            time: '9:00 PM', 
            title: `S'mores and Ghost Stories`,
            text: `Head over to the boy's quad and grab a spot by the fire pit. Kick back and relax, enjoy some toasty treats, and swap stories with old friends and new ones.`,
        },
    ],
    satEvents = [
        {
            time: '9:30 AM', 
            title: `Brunch`,
            text: `Brunch at the rec hall. Have some breakfast and experiment at the mimosa bar!`,
        },
        {
            time: '11:00 AM', 
            title: `Pickup Ultimate`,
            text: `Pick-up Ultimate game in the boy's quad. Everyone is encouraged to come play or watch.`,
        },
        {
            time: '12:00 PM', 
            title: `Open Camp`,
            text: `Open camp!! Go canoeing, play some disc golf or any of the other games and activities.`,
        },
        {
            time: '2:00 PM', 
            title: `Dress to Impress`,
            text: `Time to get ready and head to the Rec Hall lawn for some pre-freshments, then hit the beach.`,
        },
        {
            time: '3:45 PM', 
            title: `WE GET MARRIED!!`,
            text: `Make sure to bring your sunglasses, cameras, and some tissues!`,
        },
        {
            time: '4:45 PM', 
            title: `Cocktail Hour`,
            text: `Meet up on the Rec Hall lawn for appetizers, drinks, and a chance to chat with the newly-weds.`,
        },
        {
            time: '5:45 PM', 
            title: `Dinner is Served`,
            text: `We will start with wedding party introductions, dance for the first time as a married couple, and listen to some people sing our praises. Then we will get to the real reason you came... the dinner buffet!`,
        },
        {
            time: '7:30 PM', 
            title: `Dance Dance Revolution`,
            text: `Time to put on your dancing shoes, grab a partner, and groove the night away.`,
        },
        {
            time: '10:30 PM', 
            title: `Post-Nuptual Party Time!`,
            text: `Come to a bon fire in the woods or crank up your own music and feel free to keep the party rocking all night!`,
        },
    ],
    sunEvents = [
        {
            time: '8:30 AM', 
            title: `Hangover Helper`,
            text: `Cure your hangover with bacon and eggs! And a little hair of the dog, of course...`,
        },
        {
            time: '10:00 AM', 
            title: `Clean Up, Clean Up...`,
            text: `We hate to ask it, but there will be a lot of work to do to get the camp cleaned up. If you could spare at least a little of your time and help us, it would be the best wedding gift of all (other than large sums of cash)`,
        },
        {
            time: '12:00 AM', 
            title: `That's a Wrap Folks!`,
            text: `Time to pack up and ship out... the party is over. We hope that you will be leaving with sore legs, great memories, and at least some your dignity still intact!`,
        },
    ],

    // WEDDING PARTY VARIABLES
    bridesmaids = [
        {
            name: 'Rachel Wojtasinski',
            title: 'Matron of Honor',
            bio: ``,
            image: 'rachel.jpg',
        },
        {
            name: 'Maura Notini',
            title: 'Bridesmaid',
            bio: ``,
            image: 'maura.jpg',
        },
        {
            name: 'Minta Notini',
            title: 'Bridesmaid',
            bio: ``,
            image: 'minta.jpg',
        },
        {
            name: 'Shelby Jutras',
            title: 'Bridesmaid',
            bio: ``,
            image: 'shelby.jpg',
        },
        {
            name: 'Laura Birnbaum',
            title: 'Bridesmaid',
            bio: ``,
            image: 'laura.jpg',
        },
        {
            name: 'Andrea Dow',
            title: 'Bridesmaid',
            bio: ``,
            image: 'andrea.jpg',
        },
        {
            name: 'Molly O\'Riordan',
            title: 'Bridesmaid',
            bio: ``,
            image: 'molly.jpg',
        },
    ],
    groomsmen = [
        {
            name: 'CJ Dupuis',
            title: 'Best Man',
            bio: ``,
            image: 'cj.jpg',
        },
        {
            name: 'Brian Beaulieu',
            title: 'Groomsman',
            bio: ``,
            image: 'brian.jpg',
        },
        {
            name: 'Tyler Leith',
            title: 'Groomsman',
            bio: ``,
            image: 'tyler.jpg',
        },
        {
            name: 'Eric Lecours',
            title: 'Groomsman',
            bio: ``,
            image: 'eric.jpg',
        },
        {
            name: 'Jake Schwartz',
            title: 'Groomsman',
            bio: ``,
            image: 'jake.jpg',
        },
        {
            name: 'Brady Page',
            title: 'Groomsman',
            bio: ``,
            image: 'brady.jpg',
        },
        {
            name: 'Jan Wojtasinski',
            title: 'Groomsman',
            bio: ``,
            image: 'jan.jpg',
        },
    ];
let k = 0;
let liveElements = {};

//     async function loadScript(src) {
//         return await new Promise(function (resolve, reject) {
//             let s = document.createElement('script');
//             s.src = `${src}.js`
//             s.id = `${src}`
//             s.type = `text/javascript`
//             s.onload = resolve;
//             s.async = true;
//             s.onerror = reject;
//             document.body.appendChild(s);
//         })
//     }




document.addEventListener('DOMContentLoaded', work)

function work() {
    ;
    [{
        name: "home",
        id: "",
        template: `<ul>
                <li>
                <figure>
                    <img src="9.jpg" alt="image 1">
                    <figcaption>
                    <h3>Financial Systems</h3>
                </figcaption>
                </figure>
                <h1 class="box">Senior Software Engineer</h1>
                <h4 class="box">Backend and Frontend Engineering</h4>
                <p>Created tools and general problem solving, ground-up engineering.</p>
                <p>Design features, write requirements, maintain features, bug fixes.</p>
                <p>Parsers that scan financial documents and chat messages for sentiment analysis. Parsed
                    websites, forums, automated testing, interfaced with different APIs, and
                    added data to a model. Implemented caching strategies.</p>
                <p>Create bots, search, parsed financial data. Linux.</p>
                <p> Backend and Front end development, Javascript, node </p>
                <p>Tooling Express, Browser, Node, C, C++, Linux, Assembly, bash script</p>
                <a name="graph" >Visualization of skills</a>
                </li>
            <li>
            <figure>
                <img src="10.webp" alt="image 1">
                <figcaption>
                    <h3>Network Security and application developer</h3>
                </figcaption>
            </figure>
            <h1 class="box">Bricata</h1>
            <h4 class="box">Network threat detection and threat hunting.</h4>
            <p>Network threat detection and threat hunting.</p>
            <p>Scrum environment. Weekly stand-up meetings and JIRA tickets and 2-week sprints. </p>
            <p>Virtualized Debian environments.</p>
            <p> Node, C++, GO </p>
            <p>Cross-platform environment Frontend and Server.</p>
            <p>Backend included Redis, Elastic network_security_terms, and PostgreSQL, RESTful web services </p>
     
            <p>Frontend technologies angular and vanilla Js interface, visualization using the D3 framework.</p>
            <a name="search" dic="network_security_terms" >Search Terms</a>
            </li>
            <li>
            <figure>
                <img src="11.jpg" alt="image 1">
                <figcaption>
                    <h3>Full Stack Developer</h3>
                </figcaption>
            </figure>
            <h1 class="box">Comtech VirtuMedix</h1>
            <h4 class="box">VirtuMedix® telehealth platform. Allows doctors and other caregivers to virtually
                interact with their patients either on a mobile device, a web portal, or telephone.</h4>
            <p>Weekly stand-ups, JIRA tickets, and 3-week sprints are used for collaboration.</p>
            <p>Tooling included MongoDB, Elastic network_security_terms, RESTful web services.</p>
            <p>Frontend Angular and Bootstrap.</p>
            <p>WebSocket, Stripe, Open-Tok multi-layout, VoIP WebRTC, Open-Tok signaling API, and WebSocket's.
            </p>
            <p>Front and Backend work, with a focus on scaling up and expanding the Frontend functionality and
                inter-compatibility with subscribers</p>
            <a name="dynamicGrid" >Dynamic layout</a>
            </li>
            <li>
               <!-- <figure>
                    <img src="business.jpg" alt="image 1">
                    <figcaption>
                    <h3>Business Development</h3>
                </figcaption>
                </figure>
                <h1 class="box">Start Up Founding Member</h1>
                <h4 class="box">Start up planning and organization</h4>
                <p>Organizational planning.</p>
                <p>Wrote business plan, and application requirements.</p>
                <p>Communicated with investors and advisory groups.</p>
                </li>
                <li>  -->
                <figure>
              
                    <img src="ied.webp" alt="image 1">
                    <figcaption>
                    <h3>Live Code Editor</h3>
                </figcaption>
                </figure>
                <h1 class="box">Code Editor</h1>
                <h4 class="box">Real time error checking and capture</h4>
                <p>Theming Library</p>
                <p>Web Socket Support</p>
                <p>Real-time Server Side Communication</p> 
                <p>Mobile Compliant</p>
                <p>Real-time Error Handling</p>
                <a href="https://live-interactive-code-editor.herokuapp.com/" name="codeEditor">Live Code Editor</a>
                </li>
                <li>
                <figure>
                    <img src="english_to_chines.jpeg" alt="image 1">
                    <figcaption>
                    <h3>English to Chines Search</h3>
                </figcaption>
                </figure>
                <h1 class="box">Dictionary</h1>
                <h4 class="box">Search over 770611 English terms and their Chines equivalents</h4>
                <p>low latency</p>
                <p>auto suggest</p>
                 <p>Mobile Compliant</p>
                 <a name="search", dic="english-to-chines-dictionary">Search Terms</a>
                </li>
            </ul>
            `,
        router: (event) => {
            null
        },
        click: (event) => { }
    }, {
        name: "graph",
        id: "sv",
        template: `<div style="display:grid; grid-template-rows="1fr 1fr;" ><div id="sv">
                    </div>
                    <div>
                        <a name="home" href="index.html?state=home">back</a>i
                        </div></div>`,
        router: () => {
            if (Router.graph) {
                let g = graph()
            }
        },

    }, {
        name: "search",
        id: "search",
        template: `<div class="info"> 
        <p>Rest based Search across millions of records</p>
        <p> Optimized for the minium number of REST calls.</p>
        </div>
              <div><a name="home" href="index.html?state=home">back</a></div>
                <div style="display: grid; grid-template-columns: 2fr 5fr;">
                <div id="search">
                <form class="container">
                <input id="complete" placeholder="" />
                <input type="text" id="input" for="complete" placeholder="" />
                <span></span>
                </form></div> <div style="width: 100%; height: 40em; background-color:black; margin:30px" id="sv"></div></div>
                `,
        router: (event) => {

         
            const dy = search_api()

            const entries = Object.entries(dy)

            entries.forEach(([key, value]) => {
                liveElements[key] = value
            })


        }

    }, {
        name: "dynamicGrid",
        id: "grid",
        template: `<div>
                <a name="home" href="index.html?state=home">back</a>
                </div><div style="display:grid; grid-template-rows: 2fr 1fr 1fr" ><div><h1>GPU Focused Client Side Dynamically Ordered Grid System and Container with Resizable and Moveable Components</h1>
                <p>performance depends on your system </p>
                <span style="display:grid;grid-template-columns: 1fr 5fr; grid-template-rows: 1fr 1fr 1fr;">
                <p>Quantity: </p>  <br>
                <input type="number" placeholder="min 100 max 2000 elements" name="gridSize" min="1" max="5">
                </span>
                <div id="grid" size="100" dimension="100" gap="0"></div>
                </div>
                <div></div>
                    </div>`,
        router: (event) => {
            let dy = document.dynamicGrids()
            let entries = Object.entries(dy)
            entries.forEach(([key, value]) => {
                liveElements[key] = value
            })
        }

    }].forEach(node => {
        liveElements[node.name] = node
        liveElements.keydown = function keydown(event) { }
        liveElements.click = function click(event) { }
    })

    let staging = document.querySelector(`#staging`)
    let last_target;

    document.addEventListener('click', (
        event) => {

        if (event.target)
       
            liveElements.click(event)
    })

    document.addEventListener("keydown", function (event) {
        setTimeout(function () {
            liveElements.keydown(event)
        }, 300)

    })

    document.addEventListener("router", function (event) {
        const {
            detail
        } = event;
        let elementObject = liveElements[detail.state]
        if (elementObject && Router.state !== last_target) {
            staging.innerHTML = ""
            staging.innerHTML = elementObject.template
            // setTimeout(function () {
            elementObject.router();
            // }, 300)

        }
    })

    window.addEventListener('resize', function (event) {
        if (Router.state && Router.state.resize) liveElements[Router.state].resize(
            event)
    })

    staging.innerHTML = liveElements["home"].template

}
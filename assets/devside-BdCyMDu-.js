import{s as n,v as c,p as l,f as p,C as m,h as u,e as g,k as h,A as v,D as y,S as r}from"./index-wINcKeif.js";class b{constructor(){this.scene=null,this.camera=null,this.renderer=null,this.workspace=null,this.animationId=null,this.gameContainer=null,window.spriteManager=n,window.variableManager=c,window.projectManager=l}async init(){await this.initProductionMode()}async initDevelopmentMode(){console.log("Initializing Waddle Engine in Development Mode"),this.createDevelopmentLayout(),this.initThreeJS(),this.initBlockly(),this.setupDevelopmentUI(),this.startAnimationLoop(),console.log("Development mode initialized successfully")}async initProductionMode(){console.log("Initializing Waddle Engine in Production Mode"),this.createProductionLayout(),this.initThreeJS(),await this.loadWaddleGame(),this.startAnimationLoop(),this.setupFullscreen(),console.log("Production mode initialized successfully")}createDevelopmentLayout(){document.body.innerHTML=`
            <div class="app-container">
                <div class="editor-side">
                    <div class="toolbar">
                        <div class="logo">
                            <img src="favicon.ico" alt="Waddle" style="width: 32px; height: 32px; border-radius: 6px;">
                            Waddle Engine - Dev Mode
                        </div>
                        <div class="controls">
                            <button class="btn-save tooltip" data-tooltip="Save Project (Ctrl+S)" onclick="saveProject(); this.blur();">💾 Save</button>
                            <button class="btn-load tooltip" data-tooltip="Load Project (Ctrl+O)" onclick="loadProject(); this.blur();">📁 Load</button>
                        </div>
                    </div>
                    
                    <div id="blocklyDiv"></div>

                    <div id="asset-panel" class="asset-panel">
                        <div class="tabs">
                            <button class="tab active" onclick="openTab(event, 'tab-costumes')">👕 Costumes</button>
                            <button class="tab" onclick="openTab(event, 'tab-sounds')">🔊 Sounds</button>
                        </div>

                        <div id="tab-costumes" class="tab-content active">
                            <div id="costumeList" class="asset-grid"></div>
                            <div class="upload-controls">
                                <input type="file" id="costumeUpload" accept="image/*" style="display:none">
                                <button class="btn-add" onclick="document.getElementById('costumeUpload').click()">+ Add Costume</button>
                            </div>
                        </div>

                        <div id="tab-sounds" class="tab-content">
                            <div id="soundList" class="asset-list"></div>
                            <div class="upload-controls">
                                <input type="file" id="soundUpload" accept="audio/*" style="display:none">
                                <button class="btn-add" onclick="document.getElementById('soundUpload').click()">🎵 Upload Sound</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="game-side">
                    <div class="game-toolbar">
                        <div class="toolbar-left">
                            <button id="playBtn" class="btn-play" onclick="toggleGame()">▶️ Play</button>
                            <button id="stopBtn" class="btn-stop" onclick="stopGame()">⏹️ Stop</button>
                        </div>
                        <div class="toolbar-right">
                            <button onclick="resetView()">🔄 Reset View</button>
                        </div>
                    </div>
                    <div id="gameContainer" class="game-container"></div>
                    
                    <div id="inspector-panel" class="inspector-panel">
                        <h3>Inspector</h3>
                        <div id="inspector-content">
                            <p>Select a sprite to view properties</p>
                        </div>
                    </div>

                    <div id="sprite-panel" class="sprite-panel">
                        <h3>Sprites</h3>
                        <div id="spriteList" class="sprite-list"></div>
                        <button class="btn-add-sprite" onclick="addNewSprite()">+ Add Sprite</button>
                    </div>
                </div>
            </div>
        `,this.gameContainer=document.getElementById("gameContainer")}createProductionLayout(){document.body.innerHTML=`
            <div id="productionContainer" class="production-container">
                <div id="gameContainer" class="production-game"></div>
                <div id="loadingOverlay" class="loading-overlay">
                    <div class="loading-spinner"></div>
                    <p>Loading game...</p>
                </div>
                <div id="gameControls" class="production-controls">
                    <button onclick="toggleFullscreen()">⛶ Fullscreen</button>
                    <button onclick="resetGame()">🔄 Reset</button>
                </div>
            </div>
        `,this.gameContainer=document.getElementById("gameContainer")}initThreeJS(){this.scene=new p,this.scene.background=new m(8900331);const e=this.gameContainer.clientWidth/this.gameContainer.clientHeight;this.camera=new u(-400*e,400*e,400,-400,.1,1e3),this.camera.position.z=500,this.renderer=new g({antialias:!0}),this.renderer.setSize(this.gameContainer.clientWidth,this.gameContainer.clientHeight),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=h,this.gameContainer.appendChild(this.renderer.domElement);const t=new v(16777215,.8);this.scene.add(t),window.globalAmbientLight=t;const o=new y(16777215,.5);o.position.set(100,100,50),o.castShadow=!0,this.scene.add(o),window.addEventListener("resize",()=>this.handleResize()),n.init(this.scene,this.renderer)}async initBlockly(){}createToolbox(){return{kind:"categoryToolbox",contents:[{kind:"category",name:"Motion",colour:160,contents:[{kind:"block",type:"move_steps"},{kind:"block",type:"turn_right"},{kind:"block",type:"turn_left"},{kind:"block",type:"go_to"},{kind:"block",type:"point_in_direction"},{kind:"block",type:"change_x"},{kind:"block",type:"change_y"},{kind:"block",type:"set_x"},{kind:"block",type:"set_y"}]},{kind:"category",name:"Looks",colour:290,contents:[{kind:"block",type:"switch_costume"},{kind:"block",type:"next_costume"},{kind:"block",type:"change_size"},{kind:"block",type:"set_size"},{kind:"block",type:"show"},{kind:"block",type:"hide"}]},{kind:"category",name:"Events",colour:330,contents:[{kind:"block",type:"when_flag_clicked"},{kind:"block",type:"when_key_pressed"},{kind:"block",type:"when_sprite_clicked"},{kind:"block",type:"broadcast"},{kind:"block",type:"when_i_receive"}]},{kind:"category",name:"Control",colour:210,contents:[{kind:"block",type:"wait"},{kind:"block",type:"repeat"},{kind:"block",type:"forever"},{kind:"block",type:"if"},{kind:"block",type:"if_else"},{kind:"block",type:"wait_until"}]},{kind:"category",name:"Variables",custom:"VARIABLE"},{kind:"category",name:"Logic",colour:210,contents:[{kind:"block",type:"controls_if"},{kind:"block",type:"logic_compare"},{kind:"block",type:"logic_operation"},{kind:"block",type:"logic_boolean"},{kind:"block",type:"logic_null"}]}]}}setupDevelopmentUI(){}setupAssetUploads(){const e=document.getElementById("costumeUpload"),t=document.getElementById("soundUpload");e.addEventListener("change",o=>{const i=o.target.files[0];if(i&&n.activeSprite){const a=new FileReader;a.onload=s=>{n.activeSprite.addCostume(s.target.result,i.name),this.renderAssetPanels()},a.readAsDataURL(i)}}),t.addEventListener("change",o=>{const i=o.target.files[0];if(i&&n.activeSprite){const a=new FileReader;a.onload=s=>{n.activeSprite.addSound(i.name,s.target.result),this.renderAssetPanels()},a.readAsDataURL(i)}})}setupSpriteManagement(){window.addNewSprite=()=>{const e=new r(`Sprite${n.sprites.length+1}`);n.addSprite(e),n.setActiveSprite(e),this.renderSpriteList(),this.renderAssetPanels(),typeof window.updateInspector=="function"&&window.updateInspector()},window.deleteSprite=e=>{const t=n.getSprite(e);t&&(n.removeSprite(t),this.renderSpriteList(),this.renderAssetPanels(),typeof window.updateInspector=="function"&&window.updateInspector())}}setupProjectManagement(){window.saveProject=()=>{l.saveProject()},window.loadProject=()=>{const e=document.createElement("input");e.type="file",e.accept=".waddle",e.onchange=t=>{const o=t.target.files[0];o&&l.loadProject(o)},e.click()}}setupTabs(){window.openTab=(e,t)=>{const o=document.getElementsByClassName("tab-content"),i=document.getElementsByClassName("tab");for(let a=0;a<o.length;a++)o[a].classList.remove("active");for(let a=0;a<i.length;a++)i[a].classList.remove("active");document.getElementById(t).classList.add("active"),e.currentTarget.classList.add("active")}}createInitialSprite(){const e=new r("Sprite1");n.addSprite(e),n.setActiveSprite(e),this.renderSpriteList(),this.renderAssetPanels()}async loadWaddleGame(){const t=new URLSearchParams(window.location.search).get("game");if(t)try{const i=await(await fetch(t)).blob();await l.loadProject(i),document.getElementById("loadingOverlay").style.display="none"}catch(o){console.error("Failed to load game:",o),document.getElementById("loadingOverlay").innerHTML="<p>Failed to load game</p>"}else this.setupGameFileInput()}setupGameFileInput(){const e=document.getElementById("productionContainer"),t=document.createElement("div");t.className="file-input-area",t.innerHTML=`
            <div class="file-drop-zone">
                <p>Drop a .waddle file here or click to browse</p>
                <input type="file" id="gameFileInput" accept=".waddle" style="display: none;">
            </div>
        `,e.appendChild(t);const o=document.getElementById("gameFileInput"),i=t.querySelector(".file-drop-zone");i.addEventListener("click",()=>o.click()),i.addEventListener("dragover",a=>{a.preventDefault(),i.classList.add("drag-over")}),i.addEventListener("dragleave",()=>{i.classList.remove("drag-over")}),i.addEventListener("drop",async a=>{a.preventDefault(),i.classList.remove("drag-over");const s=a.dataTransfer.files[0];s&&s.name.endsWith(".waddle")&&await this.loadGameFile(s)}),o.addEventListener("change",async a=>{const s=a.target.files[0];s&&await this.loadGameFile(s)})}async loadGameFile(e){try{document.getElementById("loadingOverlay").style.display="flex",await l.loadProject(e),document.getElementById("loadingOverlay").style.display="none";const t=document.querySelector(".file-input-area");t&&t.remove()}catch(t){console.error("Failed to load game:",t),document.getElementById("loadingOverlay").innerHTML="<p>Failed to load game: "+t.message+"</p>"}}setupFullscreen(){window.toggleFullscreen=()=>{document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()},window.resetGame=()=>{n.reset(),typeof window.startGame=="function"&&window.startGame()}}startAnimationLoop(){const e=()=>{this.animationId=requestAnimationFrame(e),n.update(),this.renderer&&this.scene&&this.camera&&this.renderer.render(this.scene,this.camera)};e()}handleResize(){if(!this.camera||!this.renderer||!this.gameContainer)return;const e=this.gameContainer.clientWidth/this.gameContainer.clientHeight;this.camera.isOrthographicCamera&&(this.camera.left=-400*e,this.camera.right=400*e,this.camera.top=400,this.camera.bottom=-400),this.camera.updateProjectionMatrix(),this.renderer.setSize(this.gameContainer.clientWidth,this.gameContainer.clientHeight)}renderSpriteList(){}renderAssetPanels(){}destroy(){this.animationId&&cancelAnimationFrame(this.animationId),this.renderer&&this.renderer.dispose(),n.reset()}}window.toggleGame=()=>{const d=document.getElementById("playBtn");n.isRunning?(n.stop(),d.textContent="▶️ Play",d.classList.remove("playing")):(n.start(),d.textContent="⏸️ Pause",d.classList.add("playing"))};window.stopGame=()=>{n.stop(),n.reset();const d=document.getElementById("playBtn");d.textContent="▶️ Play",d.classList.remove("playing")};window.resetView=()=>{window.engine&&window.engine.camera&&(window.engine.camera.position.set(0,0,500),window.engine.camera.rotation.set(0,0,0))};document.addEventListener("DOMContentLoaded",async()=>{window.engine=new b,await window.engine.init()});

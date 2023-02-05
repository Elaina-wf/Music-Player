const $ = document.querySelector.bind(document)
        const $$ = document.querySelectorAll.bind(document)
        const heading = $('header h2')
        const cdThumb = $('.cd-thumb')
        const audio = $('#audio')
        const cd = $('.cd')
        const playBtn = $('.btn-toggle-play')
        const player = $('.player')
        const progress = $('#progress')
        const nextBtn = $('.btn-next')
        const prevBtn = $('.btn-prev')
        const randomBtn = $('.btn-random')
        const songsBtn = $('.song')
        const repeatBtn = $('.btn-repeat')
    
        const playlist = $('.playlist')
        const app = {
            currentIndex:0,
            isPlaying:false,
            isRandom:false,
            isRepeat:false,
            songs: [
                {
                    name: "Die for you",
                    singer: "VALORANT, Grabbitz",
                    path: "./songs/Die For You - VALORANT Champions 2021 -.mp3",
                    image:"https://i.scdn.co/image/ab67616d00001e0208074b6de9b696b218c4b57a"
                },
                {
                    name: "VISIONS",
                    singer: "VALORANT,eaJ,Safari Riot",
                    path: "./songs/eaJ & Safari Riot - VISIONS.mp3",
                    image: "https://i.scdn.co/image/ab67616d00001e02159d66a6177cfe51ef87b164"
                },
                {
                    name: "Fire Again",
                    singer: "VALORANT,Ashnikko",
                    path:"./songs/valorant-feat.-ashnikko-fire-again_456243019.mp3",
                    image: "https://i.scdn.co/image/ab67616d00001e02995da4ec5a5389e9bd17d6c3"
                },
                {
                    name: "Can't Slow Me Down",
                    singer: "Mirani,IIIBOI,GroovyRoom,VALORANT",
                    path: "./songs/CantSlowMeDown-MiraniLilBOIGroovyRoom-7610456.mp3",
                    image:"https://i.scdn.co/image/ab67616d00001e02756259a2278099152e0e1cd5"
                },
                {
                    name: "Gold Steps",
                    singer: "Neck Deep",
                    path: "./songs/Neck Deep - Gold Steps.mp3",
                    image:"https://i.scdn.co/image/ab67616d00001e0282a3560435840c14a72f6b6e"
                },
                {
                    name: "Lowlife",
                    singer: "Neck Deep",
                    path: "./songs/neck_deep_lowlife_official_music_video_2102612820160327931.mp3",
                    image:"https://i.scdn.co/image/ab67616d00001e023a278953d20b499818ed7dae"
                },
                {
                    name: "Boiling Blood",
                    singer: "塞壬唱片-MSR",
                    path: "./songs/01. Boiling Blood.mp3",
                    image:"./img/boiling_blood_cover.png"
                },
                {
                    name: "Warriors",
                    singer: "Imagine Dragons",
                    path: "./songs/Warriors.mp3",
                    image:"./img/maxresdefault.jpg"
                },
                {
                    name: "As We Fall",
                    singer: "League of Legends",
                    path: "./songs/01. As We Fall.mp3",
                    image:"./img/ab67616d0000b2739392b675fe1fad4c420ab245.jfif"
                },
                {
                    name: "RISE",
                    singer: "The Glitch Mob, Mako, and The Word Alive",
                    path: "./songs/01. RISE.mp3",
                    image:"./img/rise.jpg"
                },
                {
                    name: "Phoenix",
                    singer: "Cailin Russo and Chrissy Costanza",
                    path: "./songs/01. Phoenix.mp3",
                    image:"./img/phoenix.jpg"
                },
                {
                    name: "Take Over",
                    singer: "Jeremy McKinnon (A Day To Remember), MAX, Henry",
                    path: "./songs/01. Take Over.mp3",
                    image:"./img/take over.jfif"
                },
                {
                    name: "Ignite",
                    singer: "Zedd",
                    path: "./songs/01. Ignite.mp3",
                    image:"./img/ignite.jpg"
                },
                {
                    name: "Worlds Collide",
                    singer: "Nicki Taylor",
                    path: "./songs/01. Worlds Collide.mp3",
                    image:"./img/worlds-collide.jpg"
                },
                
            ],
            //Lắng nghe/xử lý các sự kiện (DOM events)

            handleEvents: function() {
                //Xử lý phóng to/ thu nhỏ CD
                const _this = this
                const cdWidth = cd.offsetWidth
                document.onscroll = function() {
                    const scrollTop = window.scrollY || document.documentElement.scrollTop 
                    const newCdWidth = cdWidth - scrollTop
                    cd.style.width = newCdWidth > 0 ? newCdWidth + "px":0
                    cd.style.opacity = newCdWidth / cdWidth 
                }
                //Xử lý CD rotate
                const cdThumbAnimate = cdThumb.animate([
                    {transform:'rotate(360deg)'}
                ], {
                    duration:10000, //10sec
                    iterations: Infinity
                })
                cdThumbAnimate.pause()
                //Xử lý khi click play and pause
                playBtn.onclick = function() {
                    if(_this.isPlaying) {
                        audio.pause()
                    } else {
                        audio.play()
                    }
                
                }
                
                //Tiến độ bài hát 
                audio.ontimeupdate = function() {
                    if(audio.duration) {
                        const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                        progress.value = progressPercent
                    } else {

                    }
                }
                //Khi tua bài hát 
                
                    progress.onchange = function(e) {
                    const seekTime = audio.duration/100 * e.target.value
                    audio.currentTime = seekTime
                }

                
                //Khi bài hát đang chạy hoặc dừng
                audio.onplay = function() {
                    _this.isPlaying=true
                    player.classList.add('playing')
                    cdThumbAnimate.play()
                }
                
                audio.onpause = function() {
                    _this.isPlaying=false
                    player.classList.remove('playing')
                    cdThumbAnimate.pause()
                }

                //Khi bấm prev/next
                

                nextBtn.onclick= function() {
                    if(_this.isRandom) {
                        _this.randomSong()
                    } else {
                        _this.nextSong()
                    }
                    audio.play()
                    _this.render()
                    _this.scrollToActiveSong()

                }
                prevBtn.onclick= function() {
                    if(_this.isRandom) {
                        _this.randomSong()
                    } else {
                        _this.prevSong()
                    }
                    audio.play()
                    _this.render()
                    _this.scrollToActiveSong()


                }
                // Khi kích hoạt random bài hát 
                randomBtn.onclick = function(e) {
                    _this.isRandom = !_this.isRandom
                    randomBtn.classList.toggle('active',_this.isRandom)
                }
                //Khi bài hát kết thúc 
                audio.onended = function() {
                    if(_this.isRepeat) {
                        audio.play()
                    } else if (_this.isRandom) {
                        _this.randomSong()
                    } else {
                        _this.nextSong()
                    }
                    audio.play()
                    _this.render()
                    _this.scrollToActiveSong()


                }
                //Khi kích hoạt lặp lại bài hát 
                repeatBtn.onclick = function(e) {
                    _this.isRepeat=!_this.isRepeat
                    repeatBtn.classList.toggle('active', _this.isRepeat)
                }

                //Click playlist
                playlist.onclick = function(e) {
                    const songNode = e.target.closest('.song:not(.active)')
                    if(songNode || e.target.closest('.option')) {
                        //Xử lý click vào list
                        if(songNode) {
                            // console.log(songNode.getAttribute('data-index'))
                            _this.currentIndex = Number(songNode.dataset.index)
                            _this.loadCurrentSong()
                            audio.play()
                            _this.render()

                        }
                        //Xử lý click vào option
                        if(e.target.closest('.option')) {

                        }
                    }
                }
            },  
            
            //Định nghĩa các thuộc tính cho object
            
            defineProperties: function() {
                Object.defineProperty(this,'currentSong',{
                    get: function() {
                        return this.songs[this.currentIndex]
                    }
                })
            },

            //render Songs

            render: function() {
                const htmls = this.songs.map((song,index) => {
                    return `
                    <div class="song ${index === this.currentIndex ? 'active' : ''} " data-index="${index}">
                        <div class="thumb"
                            style="background-image: url('${song.image}')">
                
                        </div>
                        <div class="body">
                            <h3 class="title">${song.name}</h3>
                            <p class="author">${song.singer}</p>
                        </div>
                        <div class="option">
                            <i class="fas fa-ellipsis-h"></i>
                        </div>
                    </div>
                    `
                })
                playlist.innerHTML = htmls.join('')
            },
            
            //Cập nhật bài hát hiện tại lên trang chính
            loadCurrentSong: function() {
                heading.textContent = this.currentSong.name
                cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
                audio.src = this.currentSong.path
                

            },
            //Kéo đến bài hát được active 

            scrollToActiveSong: function() {
                
                
                    setTimeout(() => {
                        $('.song.active').scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        })
    
                    },100) 
                

                
            },
            // Xử lí chuyển bài hát 
            nextSong: function() {
                this.currentIndex++
                if(this.currentIndex >= this.songs.length ) {
                    this.currentIndex = 0;
                }
                this.loadCurrentSong()
                
            },
            prevSong: function() {
                this.currentIndex--
                if(this.currentIndex < 0) {
                    this.currentIndex = this.songs.length-1 ;
                }
                this.loadCurrentSong()
                
            },


            //Xử lý random bài hát 
            randomSong: function() {
                let newIndex;
                do{
                    newIndex = Math.floor(Math.random() * this.songs.length)
                } while(newIndex === this.currentIndex) {
                    this.currentIndex = newIndex
                    
                }
                this.loadCurrentSong()


            },

            

            start: function() {
                
                //Định nghĩa các thuộc tính cho object
                this.defineProperties()

                //Lắng nghe/xử lý các sự kiện (DOM events)
                this.handleEvents()

                //Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
                this.loadCurrentSong()

                //render playlist
                this.render()


            }
        }

        app.start()
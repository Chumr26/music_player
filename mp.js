const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'F8_PLAYER'

const cd = $('.cd')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playList = $('.playlist')

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
        {
            name: "không cần phải nói nhiều",
            singer: "tlinh ",
            path: "./assets/audio/onlymp3.to - tlinh không cần phải nói nhiều ft. Hoàng Tôn OFFICIAL MUSIC VIDEO-7CymvjGuY5k-192k-1694140656.mp3",
            image: "https://i.ytimg.com/vi_webp/7CymvjGuY5k/maxresdefault.webp"
        },
        {
            name: "SLOW DANCING IN THE DARK",
            singer: "Joji ",
            path: "./assets/audio/onlymp3.to - Joji SLOW DANCING IN THE DARK-K3Qzzggn--s-192k-1694155294.mp3",
            image: "https://i.ytimg.com/vi_webp/K3Qzzggn--s/maxresdefault.webp"
        },
        {
            name: "Bored ",
            singer: "Billie Eilish",
            path: "./assets/audio/onlymp3.to - Billie Eilish Bored Official Audio -Q2WcdaF8uL8-192k-1694155526.mp3",
            image: "https://i.ytimg.com/vi/Q2WcdaF8uL8/hqdefault.jpg"
        },
        {
            name: "Billie Bossa Nova",
            singer: "Billie Eilish",
            path: "./assets/audio/onlymp3.to - Billie Eilish Billie Bossa Nova Official Lyric Video -4tZ969oc-yI-192k-1694155636.mp3",
            image: "https://i.ytimg.com/vi_webp/4tZ969oc-yI/maxresdefault.webp"
        },
        {
            name: "Tâm Tình",
            singer: "Mikelodic",
            path: "./assets/audio/onlymp3.to - Mikelodic Tâm Tình demo -tZrSpKKpGFk-192k-1694155828.mp3",
            image: "https://i.ytimg.com/vi_webp/tZrSpKKpGFk/maxresdefault.webp"
        },
        {
            name: "“ái” album",
            singer: "tlinh ",
            path: "./assets/audio/onlymp3.to - tlinh ái album THE LISTENING EXPERIENCE-82ZTNQNEQgE-192k-1694156036.mp3",
            image: "https://i.ytimg.com/vi_webp/82ZTNQNEQgE/maxresdefault.webp"
        },
        {
            name: "Way Down We Go",
            singer: "KALEO ",
            path: "./assets/audio/onlymp3.to - KALEO Way Down We Go Official Music Video -0-7IHOXkiV8-192k-1694156154.mp3",
            image: "https://i.ytimg.com/vi_webp/0-7IHOXkiV8/maxresdefault.webp"
        },
        {
            name: "Gimme Love",
            singer: "Joji",
            path: "./assets/audio/onlymp3.to - joji___gimme_love__official_video_-jPan651rVMs-192k-1694156237.mp3",
            image: "https://i.ytimg.com/vi_webp/jPan651rVMs/maxresdefault.webp"
        },
        {
            name: "VIỆT KIỀU",
            singer: "WREN EVANS",
            path: "./assets/audio/onlymp3.to - WREN EVANS VIỆT KIỀU ft. itsnk starring oanhdaqueen OFFICIAL MUSIC VIDEO-1XBr5BCKoTE-192k-1694156329.mp3",
            image: "https://i.ytimg.com/vi_webp/1XBr5BCKoTE/maxresdefault.webp"
        },
        {
            name: "lời tâm sự số 3",
            singer: "Mike",
            path: "./assets/audio/onlymp3.to - mike___lời_tâm_sự_số_3__lyrics_video_-ReSHW-KEuuU-192k-1694156449.mp3",
            image: "https://i.ytimg.com/vi_webp/ReSHW-KEuuU/maxresdefault.webp"
        },
        {
            name: "Nụ hôn Bisou",
            singer: "Mike",
            path: "./assets/audio/Mike - Nụ hôn Bisou (Official Lyric Video).mp3",
            image: "https://i.ytimg.com/vi/yLGC8yRa39Q/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDzh8ylnETjRRlzxmFtWds9IWv_fA"
        },
        {
            name: "Your Power",
            singer: "Billie Eilish",
            path: "./assets/audio/Your Power (Live On The Late Show with Stephen Colbert2021).mp3",
            image: "https://i.ytimg.com/vi/dcBKEEVna-g/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBLtPeVjFfEaG_aA8BiG_viGz5Nwg"
        }
    ],
    setConfig: function (key, value) {
        this.config[key] = value
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },
    loadConfig: function () {
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat
    },
    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song ${index === 0 ? 'active' : ''}" data-index="${index}">
                <div class="thumb" style="background-image: url('${song.image}')"></div>
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
        playList.innerHTML = htmls.join('')
        // tải dữ liệu từ config
        if (this.isRepeat) {
            repeatBtn.classList.add('active')
        }
        if (this.isRandom) {
            randomBtn.classList.add('active')
        }
    },
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvents: function () {
        const _this = this
        const cdWidth = cd.offsetWidth

        //xử lý quay / dừng cd
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000,
            iterations: Infinity
        })
        cdThumbAnimate.pause()
        //xử lý thu phóng cd
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newWidth = cdWidth - scrollTop
            cd.style.width = newWidth > 0 ? newWidth + 'px' : 0
            cd.style.opacity = newWidth / cdWidth
        }
        //xử lý khi click play
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }

        }
        //khi song được play
        audio.onplay = function () {
            player.classList.add('playing')
            _this.isPlaying = true
            cdThumbAnimate.play()
        }
        //khi song bị paused
        audio.onpause = function () {
            player.classList.remove('playing')
            _this.isPlaying = false
            cdThumbAnimate.pause()
        }
        //tiến độ bài hát
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
        }
        //xử lý khi tua
        progress.onchange = function (e) {
            const seekTime = audio.duration / 100 * e.target.value
            audio.currentTime = seekTime
        }
        //khi click next
        nextBtn.onclick = function () {
            _this.isRandom ? _this.randomSong() : _this.nextSong()
            audio.play()
            _this.ativeSong()
        }
        //khi click prev
        prevBtn.onclick = function () {
            _this.isRandom ? _this.randomSong() : _this.prevSong()
            audio.play()
            _this.ativeSong()
        }
        //khi bật/tắt random
        randomBtn.onclick = function () {
            _this.isRandom = randomBtn.classList.toggle('active')
            _this.setConfig('isRandom', _this.isRandom)
        }
        //khi bật/tắt repeat
        repeatBtn.onclick = function () {
            _this.isRepeat = repeatBtn.classList.toggle('active')
            _this.setConfig('isRepeat', _this.isRepeat)
        }
        //xử lý bài hát tiếp theo khi bài hát hiện tại kết thúc
        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play()
            } else {
                nextBtn.click()
            }
        }

        playList.onclick = function (e) {
            let songClicked = e.target.closest('.song:not(.active)')
            let optionClicked = e.target.closest('.option')
            if (songClicked) {
                _this.currentIndex = Number(songClicked.dataset.index)
                _this.loadCurrentSong()
                audio.play()
                _this.ativeSong()
            } else if (optionClicked) {
                //click vào nút tùy chọn
            }
            // console.log(songClicked)
            // console.log(optionClicked)
        }

    },
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`
        audio.src = this.currentSong.path
    },
    nextSong: function () {
        this.currentIndex++
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    prevSong: function () {
        this.currentIndex--
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()

    },
    randomSong: function () {
        let randomIndex
        do {
            randomIndex = Math.floor(Math.random() * this.songs.length)
        }
        while (randomIndex === this.currentIndex)
        this.currentIndex = randomIndex
        this.loadCurrentSong()
    },
    ativeSong: function () {
        let nextAtive = $(`[data-index="${this.currentIndex}"]`)
        $('.song.active').classList.remove('active')
        nextAtive.classList.add('active')
        setTimeout(() => {
            nextAtive.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
            })
        }, 100)
    },
    start: function () {
        //Gán cấu hình từ localstorage cho ứng dụng
        this.loadConfig()
        //định nghĩa các thuộc tính cho object
        this.defineProperties()
        this.handleEvents()
        this.loadCurrentSong()
        this.render()
    }

}

app.start()
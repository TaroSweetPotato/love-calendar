// 載入JSON數據
fetch('data/messages.json')
    .then(response => response.json())
    .then(messages => {
        // 顯示指定分頁
        function showSection(sectionId) {
            document.querySelectorAll('.section').forEach(section => section.classList.add('hidden'));
            document.getElementById(sectionId).classList.remove('hidden');
            document.getElementById('navMenu').classList.add('hidden');
        }

        // 手機導航選單切換
        function toggleMenu() {
            document.getElementById('navMenu').classList.toggle('hidden');
        }

        // 照片放大
        function openModal(src, caption) {
            document.getElementById('modalImage').src = src;
            document.getElementById('modalCaption').textContent = caption;
            document.getElementById('modal').classList.remove('hidden');
        }

        // 關閉 Modal
        function closeModal() {
            document.getElementById('modal').classList.add('hidden');
        }

        // 顯示當前日期
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('currentDate').textContent = `今天是 ${today}`;

        // 點擊按鈕顯示訊息
        document.getElementById('showMessage').addEventListener('click', () => {
            const messageDiv = document.getElementById('message');
            const messageText = document.getElementById('messageText');
            const messageImage = document.getElementById('messageImage');
            const messageClue = document.getElementById('messageClue');

            const todayMessage = messages.find(msg => msg.date === today) || {
                text: "希望你天天開心！",
                image: "",
                clue: ""
            };

            messageText.textContent = todayMessage.text;
            messageDiv.classList.remove('hidden');

            if (todayMessage.image) {
                messageImage.src = todayMessage.image;
                messageImage.classList.remove('hidden');
            } else {
                messageImage.classList.add('hidden');
            }

            if (todayMessage.clue) {
                messageClue.textContent = todayMessage.clue;
                messageClue.classList.remove('hidden');
            } else {
                messageClue.classList.add('hidden');
            }
        });

        // 預設顯示日曆分頁
        showSection('calendar');
    })
    .catch(error => {
        console.error('錯誤:', error);
        document.getElementById('messageText').textContent = '無法載入訊息，請檢查網絡或檔案。';
        document.getElementById('message').classList.remove('hidden');
    });
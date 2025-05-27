document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const startButton = document.getElementById('start-button');
    const onboardingScreen = document.getElementById('onboarding-screen');
    const homeScreen = document.getElementById('home-screen');
    const kioskFinderScreen = document.getElementById('kiosk-finder-screen');
    const qrScannerScreen = document.getElementById('qr-scanner-screen');
    const rewardsScreen = document.getElementById('rewards-screen');
    const profileScreen = document.getElementById('profile-screen');
    const loginSuccessScreen = document.getElementById('QR-success-screen');
    const bottomNav = document.getElementById('bottom-nav');
    const actionButton = document.getElementById('action-button');
    const mainActionBtn = document.getElementById('main-action-btn');
    const actionMenu = document.getElementById('action-menu');
    const scanQrBtn = document.getElementById('scan-qr-btn');

    // Navigation buttons
    const backFromKioskBtn = document.getElementById('back-from-kiosk');
    const backFromScannerBtn = document.getElementById('back-from-scanner');
    const backFromRewardsBtn = document.getElementById('back-from-rewards');
    const backFromProfileBtn = document.getElementById('back-from-profile');
    const findKioskBtn = document.querySelector('.find-kiosk');
    const scanRecycleBtn = document.querySelector('.scan-recycle');
    const rewardsBtn = document.querySelector('.rewards');
    const profileBtn = document.querySelector('.profile');

    // Hide all screens except onboarding
    const showScreen = (screen) => {
        // Hide all screens first
        onboardingScreen.classList.add('hidden');
        homeScreen.classList.add('hidden');
        kioskFinderScreen.classList.add('hidden');
        qrScannerScreen.classList.add('hidden');
        rewardsScreen.classList.add('hidden');
        profileScreen.classList.add('hidden');
        loginSuccessScreen.classList.add('hidden');
        
        // Show the selected screen
        screen.classList.remove('hidden');
        
        // Show/hide navigation based on screen
        if (screen === onboardingScreen || screen === qrScannerScreen || screen === loginSuccessScreen) {
            bottomNav.classList.add('hidden');
            actionButton.classList.add('hidden');
        } else {
            bottomNav.classList.remove('hidden');
            actionButton.classList.remove('hidden');
            actionMenu.classList.add('hidden'); // Hide action menu
        }

        // Update active nav button
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        if (screen === homeScreen) {
            document.querySelector('.nav-btn:nth-child(1)').classList.add('active');
        } else if (screen === kioskFinderScreen) {
            document.querySelector('.nav-btn:nth-child(2)').classList.add('active');
        } else if (screen === rewardsScreen) {
            document.querySelector('.nav-btn:nth-child(4)').classList.add('active');
        } else if (screen === profileScreen) {
            document.querySelector('.nav-btn:nth-child(5)').classList.add('active');
        }
    };

    // Start button now directly shows the home screen
    startButton.addEventListener('click', () => {
        showScreen(homeScreen);
    });

    // Action button toggle menu
    mainActionBtn.addEventListener('click', () => {
        actionMenu.classList.toggle('hidden');
    });

    document.addEventListener('click', (event) => {
        if (!actionButton.contains(event.target) && !actionMenu.classList.contains('hidden')) {
            actionMenu.classList.add('hidden');
        }
    });

    scanQrBtn.addEventListener('click', () => {
        showScreen(qrScannerScreen);
        initQRScanner();
    });

    findKioskBtn.addEventListener('click', () => {
        showScreen(kioskFinderScreen);
        initMap();
    });

    scanRecycleBtn.addEventListener('click', () => {
        showScreen(qrScannerScreen);
        initQRScanner();
    });

    rewardsBtn.addEventListener('click', () => {
        showScreen(rewardsScreen);
    });

    profileBtn.addEventListener('click', () => {
        showScreen(profileScreen);
    });

    backFromKioskBtn.addEventListener('click', () => {
        showScreen(homeScreen);
    });

    backFromScannerBtn.addEventListener('click', () => {
        showScreen(homeScreen);
    });

    backFromRewardsBtn.addEventListener('click', () => {
        showScreen(homeScreen);
    });

    backFromProfileBtn.addEventListener('click', () => {
        showScreen(homeScreen);
    });

    document.querySelectorAll('.nav-btn').forEach((btn, index) => {
        btn.addEventListener('click', () => {
            switch(index) {
                case 0:
                    showScreen(homeScreen);
                    break;
                case 1:
                    showScreen(kioskFinderScreen);
                    initMap();
                    break;
                case 2:
                    showScreen(rewardsScreen);
                    break;
                case 3:
                    showScreen(profileScreen);
                    break;
            }
        });
    });

    window.simulateSuccessfulLogin = () => {
        showScreen(loginSuccessScreen);

        setTimeout(() => {
            document.querySelector('.bg-black.text-white.w-full').addEventListener('click', () => {
                showScreen(homeScreen);
            });
            document.querySelector('.bg-white.border.border-gray-200.w-full').addEventListener('click', () => {
                showScreen(homeScreen);
            });
        }, 500);
    };
});

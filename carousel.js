const getAll = (clss) => document.querySelectorAll(clss);

const arrowsLeft = getAll('.arrow-left');
const arrowsRight = getAll('.arrow-right');
const imageFrames = getAll('.slide-container');
const dotContainers = getAll('.dot-container');

for (let i = 0; i < imageFrames.length; i++) {
	const arrowLeft = arrowsLeft[i];
	const arrowRight = arrowsRight[i];
	const imageFrame = imageFrames[i];
	const dotContainer = dotContainers[i];
	const images = imageFrame.children;

	for (let j = 0; j < images.length; j++) {
		const dot = document.createElement('div');
		dot.classList.add('dot');
		dot.setAttribute('data-index', `${j}`);
		dotContainer.appendChild(dot);

		dot.addEventListener('click', (e) => dotNavigation(e.target.dataset.index));
	}

	let autoSlide = setInterval(() => {
		next();
	}, 5000);

	const clearAutoSlide = () => {
		clearInterval(autoSlide);
		autoSlide = setInterval(() => {
			next();
		}, 5000);
	};

	const dots = dotContainer.children;
	let count = 0;

	const next = () => {
		count++;
		if (count >= images.length) count = 0;
		imageFrame.style.transform = `translateX(-${count}00%)`;
		dotNavigation(count);
	};

	const prev = () => {
		count--;
		if (count < 0) count = images.length - 1;
		imageFrame.style.transform = `translateX(-${count}00%)`;
		dotNavigation(count);
	};

	const dotNavigation = (index) => {
		imageFrame.style.transform = `translateX(-${index}00%)`;
		count = index;

		for (let y = 0; y < dots.length; y++) {
			const dot = dots[y];
			dot.classList.remove('dot-selected');
			dots[index].classList.add('dot-selected');
		}
		clearAutoSlide();
	};

	arrowRight.addEventListener('click', () => {
		next();
	});
	arrowLeft.addEventListener('click', () => {
		prev();
	});
}

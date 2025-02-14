const answer = document.getElementById("answer");
const timer = document.getElementById("timer");

const dayBox = document.getElementById("days");
const hourBox = document.getElementById("hours");
const minuteBox = document.getElementById("minutes");
const secondBox = document.getElementById("seconds");

function updateTime() {
	let now = new Date();
	let options = { timeZone: "America/Denver", hour12: false };
	let formatter = new Intl.DateTimeFormat("en-US", {
		...options,
		weekday: "long",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	});
	let parts = formatter.formatToParts(now);

	let day = parts.find((p) => p.type === "weekday").value;
	let hour = parseInt(parts.find((p) => p.type === "hour").value);
	let minute = parseInt(parts.find((p) => p.type === "minute").value);

	// In case of breakage revert to non-localized times.

	// let day = now.getDay();
	// let hour = now.getHours();
	// let minute = now.getMinutes();
	// let second = now.getSeconds();

	// let isThursday = day === 4;
	// let isSixThirty = hour === 18 && minute === 30;

	let isThursday = day === "Thursday";
	let isBetween = hour >= 18 && minute >= 30 && hour < 22;

	answer.innerText = isThursday && isBetween ? "Yes 👍" : "No 👎";
	if (answer.innerText === "Yes 👍") {
		answer.classList.remove("text-danger");
		answer.classList.add("text-success");
	} else {
		answer.classList.remove("text-success");
		answer.classList.add("text-danger");
	}

	// let nextThursday = new Date(now);
	// nextThursday.setDate(now.getDate() + ((4 - now.getDay() + 7) % 7));
	// nextThursday.setHours(18, 30, 0, 0);
	// if (now > nextThursday) nextThursday.setDate(nextThursday.getDate() + 7);

	let nextThursday = new Date();
	nextThursday.setUTCDate(
		nextThursday.getUTCDate() + ((4 - nextThursday.getUTCDay() + 7) % 7)
	);
	nextThursday.setUTCHours(18 + 7, 30, 0, 0); // Convert to UTC offset for MST (UTC-7)
	if (now > nextThursday)
		nextThursday.setUTCDate(nextThursday.getUTCDate() + 7);

	let diff = nextThursday - now;
	let seconds = Math.floor(diff / 1000) % 60;
	let minutes = Math.floor(diff / (1000 * 60)) % 60;
	let hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
	let days = Math.floor(diff / (1000 * 60 * 60 * 24));

	const dayText = days === 1 ? "day" : "days";
	const hourText = hours === 1 ? "hour" : "hours";
	const minuteText = minutes === 1 ? "minute" : "minutes";
	const secondText = seconds === 1 ? "second" : "seconds";

	dayBox.innerHTML = `${days} ${dayText}`;
	hourBox.innerHTML = `${hours} ${hourText}`;
	minuteBox.innerHTML = `${minute} ${minuteText}`;
	secondBox.innerHTML = `${seconds} ${secondText}`;

	if (answer.innerText === "Yes 👍") {
		timer.classList.add("d-none");
	} else {
		timer.classList.remove("d-none");
	}
}

setInterval(updateTime, 1000);
updateTime();

const teams = {
    eastern: [
        { value: 'celtics', name: 'Boston Celtics', logo: 'https://cdn.nba.com/logos/nba/1610612738/global/L/logo.svg' },
        { value: 'nets', name: 'Brooklyn Nets', logo: 'https://cdn.nba.com/logos/nba/1610612751/global/L/logo.svg' },
        { value: 'knicks', name: 'New York Knicks', logo: 'https://cdn.nba.com/logos/nba/1610612752/global/L/logo.svg' },
        { value: '76ers', name: 'Philadelphia 76ers', logo: 'https://cdn.nba.com/logos/nba/1610612755/global/L/logo.svg' },
        { value: 'raptors', name: 'Toronto Raptors', logo: 'https://cdn.nba.com/logos/nba/1610612761/global/L/logo.svg' },
        { value: 'bulls', name: 'Chicago Bulls', logo: 'https://cdn.nba.com/logos/nba/1610612741/global/L/logo.svg' },
        { value: 'cavaliers', name: 'Cleveland Cavaliers', logo: 'https://cdn.nba.com/logos/nba/1610612739/global/L/logo.svg' },
        { value: 'pistons', name: 'Detroit Pistons', logo: 'https://cdn.nba.com/logos/nba/1610612765/global/L/logo.svg' },
        { value: 'pacers', name: 'Indiana Pacers', logo: 'https://cdn.nba.com/logos/nba/1610612754/global/L/logo.svg' },
        { value: 'bucks', name: 'Milwaukee Bucks', logo: 'https://cdn.nba.com/logos/nba/1610612749/global/L/logo.svg' },
        { value: 'hawks', name: 'Atlanta Hawks', logo: 'https://cdn.nba.com/logos/nba/1610612737/global/L/logo.svg' },
        { value: 'hornets', name: 'Charlotte Hornets', logo: 'https://cdn.nba.com/logos/nba/1610612766/global/L/logo.svg' },
        { value: 'heat', name: 'Miami Heat', logo: 'https://cdn.nba.com/logos/nba/1610612748/global/L/logo.svg' },
        { value: 'magic', name: 'Orlando Magic', logo: 'https://cdn.nba.com/logos/nba/1610612753/global/L/logo.svg' },
        { value: 'wizards', name: 'Washington Wizards', logo: 'https://cdn.nba.com/logos/nba/1610612764/global/L/logo.svg' }
    ],

    western: [
       { value: 'nuggets', name: 'Denver Nuggets', logo: 'https://cdn.nba.com/logos/nba/1610612743/global/L/logo.svg' },
        { value: 'timberwolves', name: 'Minnesota Timberwolves', logo: 'https://cdn.nba.com/logos/nba/1610612750/global/L/logo.svg' },
        { value: 'thunder', name: 'Oklahoma City Thunder', logo: 'https://cdn.nba.com/logos/nba/1610612760/global/L/logo.svg' },
        { value: 'blazers', name: 'Portland Trail Blazers', logo: 'https://cdn.nba.com/logos/nba/1610612757/global/L/logo.svg' },
        { value: 'jazz', name: 'Utah Jazz', logo: 'https://cdn.nba.com/logos/nba/1610612762/global/L/logo.svg' },
        { value: 'warriors', name: 'Golden State Warriors', logo: 'https://cdn.nba.com/logos/nba/1610612744/global/L/logo.svg' },
        { value: 'clippers', name: 'Los Angeles Clippers', logo: 'https://cdn.nba.com/logos/nba/1610612746/global/L/logo.svg' },
        { value: 'lakers', name: 'Los Angeles Lakers', logo: 'https://cdn.nba.com/logos/nba/1610612747/global/L/logo.svg' },
        { value: 'suns', name: 'Phoenix Suns', logo: 'https://cdn.nba.com/logos/nba/1610612756/global/L/logo.svg' },
        { value: 'kings', name: 'Sacramento Kings', logo: 'https://cdn.nba.com/logos/nba/1610612758/global/L/logo.svg' },
        { value: 'mavericks', name: 'Dallas Mavericks', logo: 'https://cdn.nba.com/logos/nba/1610612742/global/L/logo.svg' },
        { value: 'rockets', name: 'Houston Rockets', logo: 'https://cdn.nba.com/logos/nba/1610612745/global/L/logo.svg' },
        { value: 'grizzlies', name: 'Memphis Grizzlies', logo: 'https://cdn.nba.com/logos/nba/1610612763/global/L/logo.svg' },
        { value: 'pelicans', name: 'New Orleans Pelicans', logo: 'https://cdn.nba.com/logos/nba/1610612740/global/L/logo.svg' },
        { value: 'spurs', name: 'San Antonio Spurs', logo: 'https://cdn.nba.com/logos/nba/1610612759/global/L/logo.svg' }
    ]
};

document.addEventListener('DOMContentLoaded', function () {
    setupTeamSelection('conference1', 'team1', 'team1-logo');
    setupTeamSelection('conference2', 'team2', 'team2-logo');
    setupFormSubmission();
    updatePredictButton();
});

function setupTeamSelection(conferenceId, teamId, logoId) {
    const confSelect = document.getElementById(conferenceId);
    const teamSelect = document.getElementById(teamId);
    const logoDiv = document.getElementById(logoId);

    confSelect.addEventListener('change', function () {
        const conf = this.value;
        teamSelect.innerHTML = '<option value="">Select team...</option>';
        if (conf && teams[conf]) {
            teamSelect.disabled = false;
            teams[conf].forEach(team => {
                const opt = document.createElement('option');
                opt.value = team.value;
                opt.textContent = team.name;
                opt.dataset.logo = team.logo;
                teamSelect.appendChild(opt);
            });
        } else {
            teamSelect.disabled = true;
            logoDiv.style.display = 'none';
        }
        updatePredictButton();
    });

    teamSelect.addEventListener('change', function () {
        const selected = this.options[this.selectedIndex];
        if (selected.value) {
            logoDiv.querySelector('img').src = selected.dataset.logo;
            logoDiv.style.display = 'flex';
        } else {
            logoDiv.style.display = 'none';
        }
        updatePredictButton();
    });
}

function setupFormSubmission() {
    const form = document.querySelector('form');
    const button = document.querySelector('.predict-button');

    button.addEventListener('click', function (e) {
        const t1 = document.getElementById('team1').value;
        const t2 = document.getElementById('team2').value;

        if (!(t1 && t2)) {
            e.preventDefault();
            return;
        }

        button.disabled = true;
        button.textContent = 'Predicting...';

        let input1 = form.querySelector('input[name="team1"]');
        let input2 = form.querySelector('input[name="team2"]');

        if (!input1) {
            input1 = document.createElement('input');
            input1.type = 'hidden';
            input1.name = 'team1';
            form.appendChild(input1);
        }

        if (!input2) {
            input2 = document.createElement('input');
            input2.type = 'hidden';
            input2.name = 'team2';
            form.appendChild(input2);
        }

        input1.value = t1;
        input2.value = t2;

        form.submit();
    });
}

function updatePredictButton() {
    const team1 = document.getElementById('team1').value;
    const team2 = document.getElementById('team2').value;
    const button = document.querySelector('.predict-button');
    button.disabled = !(team1 && team2);
    if (button.textContent === 'Predicting...') {
        button.textContent = 'Generate Prediction';
    }
}

import joblib
import pandas as pd
from django.shortcuts import render
 

model = joblib.load('predict/PredictModel/nba_winner_model.pkl')
le_team = joblib.load('predict/PredictModel/team_encoder.pkl')

TEAM_MAPPING = {
    # Eastern Teams
    'celtics': 'Boston Celtics', 'nets': 'Brooklyn Nets', 'knicks': 'New York Knicks',
    '76ers': 'Philadelphia 76ers', 'raptors': 'Toronto Raptors', 'bulls': 'Chicago Bulls',
    'cavaliers': 'Cleveland Cavaliers', 'pistons': 'Detroit Pistons', 'pacers': 'Indiana Pacers',
    'bucks': 'Milwaukee Bucks', 'hawks': 'Atlanta Hawks', 'hornets': 'Charlotte Hornets',
    'heat': 'Miami Heat', 'magic': 'Orlando Magic', 'wizards': 'Washington Wizards',
    # Western Teams
    'nuggets': 'Denver Nuggets', 'timberwolves': 'Minnesota Timberwolves',
    'thunder': 'Oklahoma City Thunder', 'blazers': 'Portland Trail Blazers',
    'jazz': 'Utah Jazz', 'warriors': 'Golden State Warriors', 'clippers': 'Los Angeles Clippers',
    'lakers': 'Los Angeles Lakers', 'suns': 'Phoenix Suns', 'kings': 'Sacramento Kings',
    'mavericks': 'Dallas Mavericks', 'rockets': 'Houston Rockets', 'grizzlies': 'Memphis Grizzlies',
    'pelicans': 'New Orleans Pelicans', 'spurs': 'San Antonio Spurs'
}

def predict_winner(team1_value, team2_value):
    try:
        team1 = TEAM_MAPPING.get(team1_value)
        team2 = TEAM_MAPPING.get(team2_value)

        if not team1 or not team2:
            return "Invalid teams"

        t1 = le_team.transform([team1])[0]
        t2 = le_team.transform([team2])[0]

        sample = pd.DataFrame([[t1, t2, 100, 100]], columns=['TEAM_1', 'TEAM_2', 'PTS_1', 'PTS_2'])
        prediction = model.predict(sample)[0]
        return team1 if prediction == 1 else team2

    except Exception as e:
        return "Error in predict ."

def predict_winner_view(request):
    winner = None
    if request.method == 'POST':
        team1 = request.POST.get('team1')
        team2 = request.POST.get('team2')
        winner = predict_winner(team1, team2)

    return render(request, 'predict/predict.html', {'winner': winner})
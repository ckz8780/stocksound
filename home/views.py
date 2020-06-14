from django.shortcuts import render
import quandl
import requests
import os
import json


def home(request):
  prices = None
  ticker = None

  if request.method == 'POST':
    quandl.ApiConfig.api_key = os.getenv('STOCKSOUND_API_KEY', None)
    ticker = request.POST.get('ticker')
    prices = quandl.get_table(
      'SHARADAR/SEP',
      ticker=ticker,
      qopts={
        'columns': ['date', 'close']
      },
    ).to_json(orient='records', date_format='iso')

    prices = json.loads(prices)[::-1]

  context = {
    'prices': prices,
    'ticker': ticker,
  }
  template = 'home.html'
  return render(request, template, context)

def about(request):
  context = {}
  template = 'about.html'
  return render(request, template, context)

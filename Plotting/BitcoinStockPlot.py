"""
import pandas as pd
from datetime import datetime
import csv
import matplotlib.pyplot as plt
import matplotlib.dates as mdates

headers = ['Date','Close']
df = pd.read_csv('./Bitcoin_Historical_Price.csv', names=headers)
#print (df)

x = df['Date']
y = df['Close']

# plot
plt.plot(x,y)

# beautify the x-labels
plt.gcf().autofmt_xdate()

plt.show()
"""
"""
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.dates as mdates

def convert_date(date_bytes):
    return mdates.strpdate2num('%d-%m-%Y')(date_bytes.decode('ascii'))

Date, Close = np.loadtxt("Bitcoin_Historical_Price.csv", unpack=True,
                         converters={0: convert_date}
)

plt.plot_date(x=Date, y=Close, fmt="r-")
plt.title("Page impressions on example.com")
plt.ylabel("Page impressions")
plt.grid(True)
plt.show()
"""

import matplotlib.pyplot as plt
import pandas as pd

dateparse = lambda x: pd.datetime.strptime(x, '%d-%m-%Y')
df = pd.read_csv("Bitcoin_Historical_Price.csv", usecols=['Date','Close'], parse_dates=['Date'], date_parser=dateparse)

df.set_index('Date',inplace=True)
plt.plot(df['Close'])
plt.show()
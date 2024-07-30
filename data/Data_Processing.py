from bs4 import BeautifulSoup

with open("C:/Users/Hayde/Documents/Projects/BWA_FashionGuide/ethical_fashion_guide/data/Raw_Data.xml") as file:
    data = file.readlines()
    html_content = ''.join(data)

soup = BeautifulSoup(html_content, 'html.parser')
items = soup.find_all('li')

data = []

for idx, item in enumerate(items, start=1):
    name = item['data-name']
    company = item['data-company'].strip()
    overall_grade = item.find('span')['data-overall-grade']

    data.append({
        'id': str(idx),
        'data-name': name,
        'data-company': company,
        'data-overall-grade': int(overall_grade)
    })


with open("Processed_Data.js", 'w+') as file:
    for i in data:
        file.write(str(i) + '\n')

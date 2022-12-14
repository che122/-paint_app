# -*- coding: utf-8 -*-
# -*- coding: utf-8 -*-
from datetime import *
from pytz import timezone

import pandas as pd
import random


# 요일
def week():
    t = ['월', '화', '수', '목', '금', '토', '일']
    r = datetime.today().weekday()
    if t[r] in ['금', '토', '일']:
        day = [t[r] + '요일']
        weekend = ['토요일', '일요일', '스트레스', '여유', '불금'] + day
        result = weekend
    else:
        day = [t[r] + '요일']
        weekday = ['으악', '월요병', '월요일', '잔잔한', '평일'] + day
        result = weekday
    return result


# 계절 봄(3~5월), 여름(6~8월), 가을(9~11월), 겨울(12~2월)
def season():
    spring = ['사랑', '데이트', '달달한', '썸', '벚꽃', '발', '봄', '봄날', '설렘', '봄노래', '산책', '나들이']
    summer = ['시원한', '더위', '청량', '바다', '여름', '청량한', '바캉스', '열대야', '해변', '여름밤']
    autumn = ['산책', '가을밤', '추억', '이별', '낙엽', '쓸쓸', '가을감성', '감성', '발라드']
    winter = ['겨울', '따뜻한', '추움', '따뜻한', '겨울감성', '쌀쌀한', '추위', '12월', '11월', '찬바람', '겨울밤']

    now = datetime.now(timezone('Asia/Seoul'))
    month = now.month
    if month in [12, 1, 2]:
        result = winter
    elif month in [3, 4, 5]:
        result = spring
    elif month in [6, 7, 8]:
        result = summer
    elif month in [9, 10, 11]:
        result = autumn

    return result


# 시간
def time():
    morning = ['출근길', '아침', '힐링', '출근길', '월요병', '스트레스', '시작',
               '잔잔한', '월요일', '지하철', '버스', '등교', '노동요', '일', '모닝콜', '상쾌한']
    afternoon = ['잔잔한', '버스킹', '산책', '직장인', '포근한', '시간', '낮잠', '밝은', '기분전환',
                 '센스선곡', '힐링', '점심', '활기차게', '소소한']
    evening = ['오후', '감성', '휴식', '힐링', '잔잔한', '저녁', '밤', '퇴근길', '새벽', '위로',
               '저녁', '퇴근', '버스', '스트레스', '분위기', '지하철', '집']

    dawn = ['밤새벽', '밤', '잔잔한', '감성', '휴식', '이별', '슬픔', '추억', '회상', '카페', '분위기',
            '새벽감성', '몽환', '혼자', '센치', '잠들기전', '새벽']

    now = datetime.now(timezone('Asia/Seoul'))
    hour = now.hour
    if hour in list(range(0, 7)):
        result = dawn
    elif hour in list(range(7, 12)):
        result = morning
    elif hour in list(range(12, 18)):
        result = afternoon
    else:
        result = evening
    return result


# 감정 :
def emotion(emo, label):
    joy = ['사랑', '설렘', '행복', '연애', '고백', '웃음', '두근두근', '휴식', '평화', 'Like',
             '힐링', '설레임', '여행', '데이트', '카페', '인생', '심쿵', '연인', '미소', '행복한', '트렌디',
             '기분좋은', '밝은', '즐거운', '따뜻한', '재밌는', '기분좋은곡', '밝음', '엽기', '다잘될거야']
    anger = ['스트레스', '기분전환', '분노', '스트레스해소', '짜증날때', '빡칠때', '짜증', '열받을때', '회사',
             '꿀꿀할때', '가슴이답답할때', '질주', '분노표출', '화날때', '힐링', '기분안좋을때', '긍정적',
             '답답할때', '화', '욕하고싶을때', '퇴사']
    sorrow = ['슬픔', '휴식', '힐링', '잔잔한', '혼술', '위로', '추억', '쉬는날', '밤', '감성', '그리움',
            '발라드', '쓸쓸함', '알앤비', '슬픈노래', '보고싶어', '새벽감성', '분위기', '치유', '따듯', '눈물',
            '안개', '우울', '펑펑', '슬플때', '이별', '아픔', '혼자있고싶을때', '우울한', '울고싶을때', '새벽']
    surprise = ['또라이', '신나는', '신나는음악', '밝은', '활기차게', '기분전환', '재밌는', '엽기', '댄스', 'EDM',
            '댄스곡', '질주', '신남', '랩', '클럽음악', '락', '드라이브', '힙합', '비트', '리드미컬', '부스터',
            '파티', '아이돌그룹', '경쾌한', '두둠칫', '클럽', '일렉트로니카', '스트레스']

    neutral = non_emotion(label)

    if emo == 'joy':
        result = joy
    elif emo == 'anger':
        result = anger
    elif emo == 'sorrow':
        result = sorrow
    elif emo == 'surprise':
        result = surprise    
    else:
        result = neutral

    return result

def non_emotion(label):
    non_emo = []
    is_flower = 0
    is_rain = 0
    mountain = ["산", "휴식", "숲", "명상", "새소리", "여행", "계곡", "요가", "휴가",  '산책', '나들이','힐링']
    water = ['추억', '이별', '쓸쓸', '가을감성', '감성', '발라드', '잔잔한', '혼자', '센치', '회상', '우울', '비오는날', '비', '아련', '슬픔']
    ocean = ['감성', '휴식','분위기', '치유','힐링', '시원한', '더위', '청량', '바다', '여름', '청량한', '바캉스', '열대야', '해변', '여름밤']
    stream = ["자연", "백색소음", "여름", "물놀이", "더위", "시원함", "폭포", "숲길", "바캉스", "시원함", "청량", '산책']
    sky = ['설렘', '행복', '고백', '웃음', '두근두근', '휴식', '평화', 'Like','힐링', '설레임', '여행', '인생', '미소', '행복한', '트렌디',
            '기분좋은', '밝은', '즐거운', '따뜻한', '재밌는', '기분좋은곡', '밝음', '다잘될거야', '활기차게', '기분전환', '드라이브']
    flower = ["벚꽃", "포근함", "봄", "힐링", "사랑", "달달한", "감성적인", "소풍", "주말", "나들이", "산책", "기분좋은", "예쁜", "행복", "꽃놀이",
            "여유", "연애", "커플", "휴식", "고백"]

    for i in label:
        if i == 'mountain' or i == 'tree' or i == 'grass' or i == 'green' or i == 'plant':
            is_flower = 0
        elif i == 'water' or i == 'liquid' or i == 'umbrella':
            is_rain = 1
        elif i == "ocean" or i == "beach":
            is_rain = 0
        elif i == 'stream' or i == 'Fluvial landforms of streams':
            return stream
        elif i  == 'sky' or i == 'cloud' or i == 'light':
            return sky
        elif i == 'flower':
            is_flower = 1

    if is_flower == 0:
        return mountain
    elif is_flower == 1:
        return flower
    elif is_rain == 0:
        return ocean
    elif is_rain == 1:
        return water

    return non_emo


# 각 변수에 맞게 random한 20개의 tag list return
def random_tag(emotionplst, season, week, time, emo):
    tag_out = []
    if emo in ['joy', 'anger', 'sorrow', 'surprise']:
        tag_out += random.sample(emotionplst, 8)
        tag_out += random.sample(season, 4)
        tag_out += random.sample(week, 4)
        tag_out += random.sample(time, 4)

    elif emo == 'neutral' and not emotionplst :
        tag_out += random.sample(season, 6)
        tag_out += random.sample(week, 7)
        tag_out += random.sample(time, 7)

    else:
        tag_out += random.sample(emotionplst, 8)
        tag_out += random.sample(season, 4)
        tag_out += random.sample(week, 4)
        tag_out += random.sample(time, 4)

    return tag_out


def run(emo, label):
    w = week()
    s = season()
    t = time()
    e = emotion(emo, label)
    total = random_tag(e, s, w, t, emo)

    return total


def variable(song_csv, train_json):
    song_meta = pd.read_csv(song_csv, index_col=0)

    data = pd.read_json(train_json, typ='frame', encoding="utf-8")


    # 아티스트 이름, 노래 제목 리스트
    artist = zip(song_meta.artist_name_basket, song_meta.song_name)

    # 출력부분
    song_id = dict(zip(song_meta["id"], artist))
    conv_song = dict(zip(data["id"], data.songs))

    return data, song_id, conv_song


def sub_recommend(data, total, conv_song):
    # data tag list
    tags = data.tags.tolist()

    len_t = []
    for i, tages in enumerate(tags):
        # 상황에 맞게 나온 'total' tag, 전체 plylist의 tag 중 같은 tag의 수
        len_t.append(len(list(set(tages).intersection(total))))

    # playlist의 id와 중복 tag 수 dict
    ply_tag = dict(zip(data["id"], len_t))
    # 위에 값에서 많이 중복된 playlist 100개 출력
    ply_tag = sorted(ply_tag.items(), key=(lambda x: x[1]), reverse=True)[:100]

    # playlist의 id 추출
    p_id = list(map(lambda x: x[0], ply_tag))

    plylst = []
    for i in p_id:
        # 각 playlist마다 song 출력
        plylst.append(conv_song[i])

    return plylst


def recommendtaion(sub_recom):
   
    # 추천된 playlist들중에 상위 10개에서 랜덤 1개 출력
    a = random.sample(sub_recom[:10], 1)
    ply_id = a[0][0]
    ply_title = a[0][1]
    ply_tag = a[0][2]

    return ply_id, ply_title, ply_tag


def main(song_csv, train_json, emo, label):

    data, song_id, conv_song = variable(song_csv, train_json)
    total = run(emo, label)
    sub_recom = sub_recommend(data, total, conv_song)
    ply_id, ply_title, ply_tag = recommendtaion(sub_recom)


    # s = conv_song[ply_id]
    #
    # song_list = []
    # for so in s:
    #     song_list.append(song_id[so])
    print(total)
    print(ply_id)
    print(ply_title)
    print(ply_tag)

    return ply_title, ply_tag

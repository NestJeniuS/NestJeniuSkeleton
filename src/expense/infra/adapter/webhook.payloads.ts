const getRandom = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const lifeQuotes = [
  '저축은 미래에 대한 가장 확실한 투자입니다.',
  '적게 쓰고 많이 모으는 것이 부의 시작이다.',
  '돈은 작은 부분들의 합이다. 따라서 작은 부분들에 주의를 기울이자.',
  '절약은 지혜의 첫 번째 단계이다.',
  '소비자는 소비, 투자자는 투자, 그리고 저축자는 저축해야 한다.',
  '지출을 줄이고 저축을 늘리면서 돈을 모으세요.',
  '향후를 위해 오늘을 준비하세요.',
  '돈을 통제하는 것이 자유를 얻는 길이다.',
  '저축은 성공의 열쇠 중 하나이다.',
  '이익보다는 저축이 중요하다.',
  '가난은 잘못된 소비에서 비롯된다.',
  '저축은 지식을 늘리는 첫 번째 단계이다.',
  '오늘의 절약은 내일의 부의 시작이다.',
  '돈을 효율적으로 관리하면 시간과 에너지를 절약할 수 있다.',
  '돈을 무분별하게 쓰면, 그 속에는 언제나 불안이 따라다닌다.',
  '저축은 새로운 시작을 위한 토대이다.',
  '매일 조금씩 모으면 큰 저축이 된다.',
  '돈은 지식과 지혜를 가진 사람에게만 본질적인 가치를 발휘한다.',
  '어떤 돈도 너무 작아서 무시할 일은 없다.',
  '더 나은 미래를 위해 오늘 행동하세요.',
]

const conditionType = {
  good: {
    url: 'https://mblogthumb-phinf.pstatic.net/MjAxODAzMTVfMTk2/MDAxNTIxMDc4NjgzNzcw.r3NmOE0xWmUiCdrJs1w0MC7Slh2EoBuJIfclWVObovcg.cQ2563Qx2lu-Rj6hrohI3MNfHj-7QyLvCs7GiklZk5cg.PNG.osy2201/16.png?type=w800',
    message: '아주 잘 아끼고 있습니다! 오늘도 화이팅!',
  },
  proper: {
    url: 'https://static.wikia.nocookie.net/supernaturalpowers/images/6/6d/%ED%8C%8C%EB%9E%80%EC%83%89_%EA%B7%B8%EB%A6%BC.png/revision/latest/scale-to-width-down/360?cb=20211005054435&path-prefix=ko',
    message: '충분히 잘 아끼고 있어요! 오늘도 열심히!',
  },
  warning: {
    url: 'https://static.wikia.nocookie.net/supernaturalpowers/images/3/3c/%EB%85%B8%EB%9E%80%EC%83%89_%EA%B7%B8%EB%A6%BC.png/revision/latest/scale-to-width-down/360?cb=20210111071044&path-prefix=ko',
    message: '하루 소비량이 기준치를 넘었어요! 오늘은 아껴쓰세요!',
  },
  danger: {
    url: 'https://static.wikia.nocookie.net/supernaturalpowers/images/d/d5/%EB%B9%A8%EA%B0%84%EC%83%89_%EA%B7%B8%EB%A6%BC.png/revision/latest?cb=20201209032858&path-prefix=ko',
    message: '소비량이 총 예산을 넘었어요! 절약!',
  },
}

export const payloads = {
  //디스코드 웹 훅 페이로드 (오늘 지출 추천)
  MORNING_CONSULTING: (data) => {
    return {
      username: 'Big-Money',
      avatar_url:
        'https://lh3.googleusercontent.com/fife/AGXqzDnIfIzdtYB7LmcMMtDxCQLx_D59c7b_LSpfCLUCyCsvF_alga-v4igmtSRKg4LT6WfhzHVDTtCjvLrgDcLkvsR1dl0PMCDM8-PCqfCuI6-dmF6hU0_P9YH7VojFZRPQQerilOKkEa51b47doi4PXDOLTH7Z87hqcjJbLPltB9Fw38s4ocGGdzmC9IhbHTfvBwzU8WH8o3jY-qqjrijOy3IbiQz3nWIqjBP1LXKRU4XVJC6n7QdkxVmSMQkDGfdDe9tEaTR16qxmfzr_VNJQ7j1ls2Tqq4Hqy7VoAl62zzjeJzdNLQo040SDNsYWHckxZ1vjg8ssd7C_CrTD_ZMpBLWDjP1tignAN0QSJ5trHecJdavaRTBWZPBaPrBVhImPsi_8M28TTit1BrEOhEZjy3gS4-yfYEgx8U06FE9htnXGA1GJn3_HOUBwts-B6G9ZyTLLHBh8kPb9fESgLYV8Th1vMY_LeBDMQMTsReHDi4WUkSQdxKCnZ9V2ywWRw1uz_QVjkVVyc1NcLMvMAc5FvPBbf3gtCrjeHBIRuK7qbncs9hZTVOfUdWp6XNA9oCFb4sRdHKNvZN-FMINtmOAowbP48J9493wRCdo8bcu_zREKUnP4WddvVt5Tab4PI0G3-7VY5LefwxLbgZ1RnH3eOjEv3iInAlk9SC0Wi5yQR3oLqN603S2CGx3W6WKoj-i7o4Pw9tA4ZwFL4kuLaGK3mrS2-N4JAlVzJRz6S0e7muF6UPtL9MviK7oUIePAZUrc7N_MlhQt0M4RR0_oZQIQjli0qenkkrz8L-b3rEMgv8AfBCObROiXWlCsS7rE0ICtEYfcagZk45CGwVbO8774korvB6_vWKOjUSK_cbCY6k8bgKpTjDr1EZVcte_pVdqYtq9RYGYEIzAaNpXipQ2mg5wSEaTwsp3yPjmJYf6l1FoydkIgSTxTbI2O-Ej3KfxvZHY_uNpt5-UA9Nld-zlIDhoW6Eo2Z9ZfjCc_e0pqrXuncVgCA4DgKl81Hr5Buq1Qv9yJ3_pRRGqUkp_vgUwZcZbOWfznBpgavnDbAgTJcogyVMH7DyXlNHUWK-jhO9isaKcuFYtP_C_h-ibatq8gzsGgC1xE_owMefBtzqlynqPH2yLSIeeYbmkSHjLg2q1Jtb_S7Ey3ABg7N8FHZcCBPu0bHSEx54s2qySyI0AUKeCfd6SlguQcDH4EXO_QyE15010X8AqjzV7DxYF_q1wTd2NWAQMOl3eKw6V4ngEFaHX7O-WJg4Zy2eQLI35uzoM7gCpYg0So1V0kMf_lEO67IrhbXkhnqxjEJUMFCmmJAeeZ8j9geDbwwbCaoRF7tQVXH3oNSsGbQsxyFKqCI5Axj4ysPOFmezBi0NI81m-FaQMaXCXF17WW2KG-TIZwYv7j-yg0dxfTrA5vvBlPJgXS7gx_CS6puAz_ZJLGyxHsc7ZiNkiLquVhdnJuWKcnnc2AynFynMA6c5-nbqxZL8Wb7IJo3q5UG5QtrCbzjZBODqHwbEnUP4n-6X0DoHbPwROS=w2688-h1228',
      content: '오늘만 아끼면 내일은 부자!💰',
      embeds: [
        {
          author: {
            name: '❗️ 오늘 지출 추천 ❗️',
          },
          description: '설정하신 예산을 기준으로 오늘 지출금액을 추천드려요.',
          color: 15258703,
          fields: data,
        },
      ],
    }
  },

  //디스코드 웹 훅 페이로드 (오늘 지출 안내)
  EVENING_CONSULTING: (data) => {
    return {
      username: 'Dollar-Guard',
      avatar_url:
        'https://lh3.googleusercontent.com/fife/AGXqzDnIfIzdtYB7LmcMMtDxCQLx_D59c7b_LSpfCLUCyCsvF_alga-v4igmtSRKg4LT6WfhzHVDTtCjvLrgDcLkvsR1dl0PMCDM8-PCqfCuI6-dmF6hU0_P9YH7VojFZRPQQerilOKkEa51b47doi4PXDOLTH7Z87hqcjJbLPltB9Fw38s4ocGGdzmC9IhbHTfvBwzU8WH8o3jY-qqjrijOy3IbiQz3nWIqjBP1LXKRU4XVJC6n7QdkxVmSMQkDGfdDe9tEaTR16qxmfzr_VNJQ7j1ls2Tqq4Hqy7VoAl62zzjeJzdNLQo040SDNsYWHckxZ1vjg8ssd7C_CrTD_ZMpBLWDjP1tignAN0QSJ5trHecJdavaRTBWZPBaPrBVhImPsi_8M28TTit1BrEOhEZjy3gS4-yfYEgx8U06FE9htnXGA1GJn3_HOUBwts-B6G9ZyTLLHBh8kPb9fESgLYV8Th1vMY_LeBDMQMTsReHDi4WUkSQdxKCnZ9V2ywWRw1uz_QVjkVVyc1NcLMvMAc5FvPBbf3gtCrjeHBIRuK7qbncs9hZTVOfUdWp6XNA9oCFb4sRdHKNvZN-FMINtmOAowbP48J9493wRCdo8bcu_zREKUnP4WddvVt5Tab4PI0G3-7VY5LefwxLbgZ1RnH3eOjEv3iInAlk9SC0Wi5yQR3oLqN603S2CGx3W6WKoj-i7o4Pw9tA4ZwFL4kuLaGK3mrS2-N4JAlVzJRz6S0e7muF6UPtL9MviK7oUIePAZUrc7N_MlhQt0M4RR0_oZQIQjli0qenkkrz8L-b3rEMgv8AfBCObROiXWlCsS7rE0ICtEYfcagZk45CGwVbO8774korvB6_vWKOjUSK_cbCY6k8bgKpTjDr1EZVcte_pVdqYtq9RYGYEIzAaNpXipQ2mg5wSEaTwsp3yPjmJYf6l1FoydkIgSTxTbI2O-Ej3KfxvZHY_uNpt5-UA9Nld-zlIDhoW6Eo2Z9ZfjCc_e0pqrXuncVgCA4DgKl81Hr5Buq1Qv9yJ3_pRRGqUkp_vgUwZcZbOWfznBpgavnDbAgTJcogyVMH7DyXlNHUWK-jhO9isaKcuFYtP_C_h-ibatq8gzsGgC1xE_owMefBtzqlynqPH2yLSIeeYbmkSHjLg2q1Jtb_S7Ey3ABg7N8FHZcCBPu0bHSEx54s2qySyI0AUKeCfd6SlguQcDH4EXO_QyE15010X8AqjzV7DxYF_q1wTd2NWAQMOl3eKw6V4ngEFaHX7O-WJg4Zy2eQLI35uzoM7gCpYg0So1V0kMf_lEO67IrhbXkhnqxjEJUMFCmmJAeeZ8j9geDbwwbCaoRF7tQVXH3oNSsGbQsxyFKqCI5Axj4ysPOFmezBi0NI81m-FaQMaXCXF17WW2KG-TIZwYv7j-yg0dxfTrA5vvBlPJgXS7gx_CS6puAz_ZJLGyxHsc7ZiNkiLquVhdnJuWKcnnc2AynFynMA6c5-nbqxZL8Wb7IJo3q5UG5QtrCbzjZBODqHwbEnUP4n-6X0DoHbPwROS=w2688-h1228',
      content: '오늘도 현명한 소비를 하셨나요?😉',
      embeds: [
        {
          author: {
            name: '💸 오늘 지출 안내 💸',
          },
          description: '오늘 지출하신 금액을 안내드립니다.',
          color: 15258703,
          fields: data,
          footer: {
            text: lifeQuotes[getRandom(0, lifeQuotes.length - 1)],
          },
        },
      ],
    }
  },
}

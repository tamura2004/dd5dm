races = [
  {
    name: "コボルド",
    size: "小型",
    ability: [8, 14, 8, 8, 14, 14],
    specials: [
      "集団戦術：味方が隣接している敵への攻撃に有利を得る",
    ],
  },
  {
    name: "ゴブリン",
    size: "小型",
    ability: [10, 12, 12, 10, 12, 12],
    specials: [
      "集団戦術：味方が隣接している敵への攻撃に有利を得る",
    ],
  },
  {
    name: "オーク",
    size: "中型",
    ability: [14, 8, 16, 8, 8, 8],
    specials: [
      "殺到：ボーナスアクションで敵に向かって移動できる",
    ],
  },
  {
    name: "バグベア",
    size: "小型",
    ability: [12, 12, 14, 8, 8, 8],
    specials: [
      "蛮力：近接武器のダメージダイスが１つぶん多くなる",
    ],
  },
]

klasses = %w(
  ファイター
  ローグ
  メイジ
  プリースト
)

races.each do |race|
  klasses.each do |klass|
    str, dex, con, int, wis, cha = race[:ability]
    specials = race[:specials].dup
    attributes = []
    actions = []

    case klass
    when "ファイター"
      str += 4
      int -= 4
      th = 2 + (str - 10) / 2 + 2
      dm = (str - 10) / 2 * 3 / 2 + 2
      actions << "呪槍+2:近接武器、攻撃+#{th}、間合い10フィート、目標1つ、ヒット#{dm + 4}(1d8+#{dm})[刺突]ダメージ"
      specials << "呪槍は巣穴を離れると魔力を失う。"
    when "ローグ"
      dex += 4
      con -= 4
      th = 2 + (dex - 10) / 2 + 2
      dm = (dex - 10) / 2 + 2
      actions << "呪弓+2:遠隔武器、攻撃+#{th}、間合い60フィート、目標1つ、ヒット#{dm + 3}(1d6+#{dm})[刺突]ダメージ"
      specials << "急所攻撃:+1d6"
      specials << "呪弓は巣穴を離れると魔力を失う。"
    when "メイジ"
      int += 4
      con -= 4
      th = (int - 10) / 2 + 2
      dm = (int - 10) / 2
      actions << "魔法能力:マジックミサイル（3回/日、1d4+2 x 2）"
      actions << "魔法能力:ショッキンググラスプ（無制限、攻撃+#{th}、ヒット#{dm + 4}(1d8+#{dm})[電撃]）"
    when "プリースト"
      wis += 4
      int -= 4
      th = (wis - 10) / 2 + 2
      dm = (wis - 10) / 2
      actions << "魔法能力:インフリクト・ウーンズ（3回/日、攻撃+#{th}、ヒット#{15 + dm}(3d10+#{dm})[死霊]）"
      actions << "魔法能力:アンホーリィフレイム、（無制限、60フィート以内の対象は難易度#{8 + th}の【敏捷】セーブに失敗すると#{4 + dm}(1d8+#{dm})[死霊]ダメージ）"
    end

    ac = 12 + (dex - 10) / 2

    puts "{"
    puts "  name: '#{race[:name]}・#{klass}',"
    puts "  size: '#{race[:size]}',"
    puts "  type: '人型生物',"
    puts "  alignment: '混沌にして悪',"
    puts "  ac: #{ac},"
    puts "  maxHp: #{con},"
    puts "  mv: '30フィート',"
    puts "  ability: ["
    puts "    #{str},"
    puts "    #{dex},"
    puts "    #{con},"
    puts "    #{int},"
    puts "    #{wis},"
    puts "    #{cha},"
    puts "  ],"
    puts "  exp: 100,"
    puts "  attributes: ["
    puts "    '感覚: 暗視60フィート',"
    puts "    '言語: 共通語、奈落語',"
    puts "  ],"
    puts "  actions: ["
    actions.each do |action|
      puts "    '#{action}',"
    end
    puts "  ],"
    puts "  specials: ["
    specials.each do |special|
      puts "    '#{special}',"
    end
    puts "  ],"
    puts "},"
  end
end

import styles from "./Recruitment.module.css"


// <div class="recruitment test2">
//   bbb
// </div>
// <div class="recruitment">
//   111
//   <div class="test2">
//     ccc
//   </div>
// </div>

const Recruitment = () => {
  return (
    <h1>コラボを登録する
      <form method="post">
        <div className={styles.recruitment}>
          <label>
            コラボ名: <input className="name" id="name" name="name"/>
          </label>
          <hr/>
          <label>
            ジャンル: <input name="genre"/>
          </label>
          <hr/>
          <label>
            曲名: <input name="songTitle"/>
          </label>
          <hr/>
          <label>
            アーティスト名: <input name="artist"/>
          </label>
          <hr/>
          <label>
            コラボ元の楽器: <input name="ownerInstruments"/>
          </label>
          <hr/>
          <label>
            募集楽器: <input name="recruitedInstruments"/>
          </label>
          <label>
            人数: <input name="countOfInstruments"/>
          </label>
          <h3>募集条件</h3>
          <hr/>
        </div>
        <button type="submit">Submit form</button>
      </form>
    </h1>
  );
};

export default Recruitment;
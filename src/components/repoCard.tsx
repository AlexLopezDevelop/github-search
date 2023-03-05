import styled from "styled-components";
import {RepoProps} from "../types/repo";

export const RepoCard = (repo: RepoProps) => {
    return (
        <Container>
            <RepoHeader>
                <RepoName>{repo.name}</RepoName>
                <RepoOwner>
                    <OwnerAvatar src={repo.owner.avatar_url} alt="owner"/>
                    <OwnerName>{repo.owner.login}</OwnerName>
                </RepoOwner>
            </RepoHeader>
            <RepoDescription>{repo.description}</RepoDescription>
            <RepoFooter>
                <RepoTopics>
                    {repo.topics.map((topic, index) => (
                        <Topic key={index}>{topic}</Topic>
                    ))}
                </RepoTopics>
                <RepoLanguage>{repo.language}</RepoLanguage>
                <RepoStars>
                    <StarIcon/>
                    <StarCount>{repo.stargazers_count}</StarCount>
                </RepoStars>
            </RepoFooter>
        </Container>
    )
}

const Container = styled.div`
  background: #fff;
  border-radius: 1.5rem;
  padding: 2.4rem;
  margin-bottom: 2.4rem;
`

const RepoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const RepoName = styled.h2`
  font-size: 2.4rem;
  font-weight: 700;
  color: #1a1a1a;
`

const RepoOwner = styled.div`
  display: flex;
  align-items: center;
`

const OwnerAvatar = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  margin-right: 1.6rem;
`

const OwnerName = styled.span`
  font-size: 1.6rem;
  font-weight: 500;
  color: #1a1a1a;
`

const RepoDescription = styled.p`
  font-size: 1.6rem;
  font-weight: 400;
  color: #1a1a1a;
  margin: 1.6rem 0;
`

const RepoFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const RepoTopics = styled.div`
  display: flex;
  align-items: center;
`

const Topic = styled.span`
  font-size: 1.4rem;
  font-weight: 500;
  color: #1a1a1a;
  background: #f1f1f1;
  border-radius: 1.5rem;
  padding: 0.8rem 1.6rem;
  margin-right: 1.6rem;
`

const RepoLanguage = styled.span`
  font-size: 1.4rem;
  font-weight: 500;
  color: #1a1a1a;
`

const RepoStars = styled.div`
  display: flex;
  align-items: center;
`

const StarIcon = styled.img.attrs({
    src: "/images/star.svg",
    alt: "star"
})`
  width: 1.6rem;
  height: 1.6rem;
  margin-right: 0.8rem;
`

const StarCount = styled.span`
  font-size: 1.4rem;
  font-weight: 500;
  color: #1a1a1a;
`
